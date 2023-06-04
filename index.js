const { execSync, exec, spawn } = require('child_process');
let file = require('file-utils');
let fs =   require('fs-extra');
let colors = require('colors');
let path = require('path');

// Dir's Projects
let dir = path.join(__dirname);
let dir_audit = path.join(dir,'audit');
let dir_storage = path.join(dir,'storage');
let dir_backend = path.join(dir,'backend');
let dir_common = path.join(dir,'common');
let dir_frontend = path.join(dir,'frontend');
let dir_game_machine = path.join(dir,'game_machine');

let audit_exist = fs.existsSync(path.join(dir_audit,'package.json'));
let storage_exist = fs.existsSync(path.join(dir_storage,'package.json'));
let backend_exist = fs.existsSync(path.join(dir_backend,'package.json'));
let common_exist = fs.existsSync(path.join(dir_common,'package.json'));
let frontend_exist = fs.existsSync(path.join(dir_frontend,'package.json'));
let game_machine_exist = fs.existsSync(path.join(dir_game_machine,'package.json'));

// Verify dir's exist
if( !audit_exist || !storage_exist || !backend_exist || !common_exist || !frontend_exist || !game_machine_exist ){

    console.log(` [ ${ ('fail'.red) } ] Project's not found: `);

    if(!audit_exist)console.log( `\t + ${ (dir_audit.red) }` );
    
    if(!audit_exist)console.log( `\t + ${ (dir_storage.red) }` );

    if(!backend_exist)console.log( `\t + ${ (dir_backend.red) }` );

    if(!common_exist)console.log( `\t + ${ (dir_common.red) }` );

    if(!frontend_exist)console.log( `\t + ${ (dir_frontend.red) }` );

    if(!game_machine_exist)console.log( `\t + ${ (dir_game_machine.red) }` );

    execSync('git submodule init && git pull --recurse-submodules');
    execSync('git submodule update --remote');

}

let file_env = path.join(dir,'.env');
let file_env_example = path.join(dir,'.env.EXAMPLE');

if(!fs.existsSync(file_env)){
    console.log(` [ ${ ('Fail'.red) } ] Env not found`);
    fs.copyFileSync(file_env_example, file_env);
    console.log(` [ ${ ('OK'.green) } ] Create Env`);
}

let dotenv = require('dotenv');
dotenv.config({path:'./.env'});

// env file from project's

let file_env_audit = path.join(dir_audit,'.env');
let file_env_example_audit = path.join(dir_audit,'.env.EXAMPLE');
let file_env_storage = path.join(dir_storage,'.env');
let file_env_example_storage = path.join(dir_storage,'.env.EXAMPLE');
let file_env_backend = path.join(dir_backend,'.env');
let file_env_example_backend = path.join(dir_backend,'.env.EXAMPLE');
let file_env_common = path.join(dir_common,'.env');
let file_env_example_common = path.join(dir_common,'.env.EXAMPLE');
let file_env_frontend = path.join(dir_frontend,'.env');
let file_env_example_frontend = path.join(dir_frontend,'.env.EXAMPLE');
let file_env_game_machine = path.join(dir_game_machine,'.env');
let file_env_example_game_machine = path.join(dir_game_machine,'.env.EXAMPLE');

if(!fs.existsSync(file_env_audit)){
    console.log(` [ ${ ('Fail'.red) } ] Env not found`);
    fs.copyFileSync(file_env_example_audit, file_env_audit);
    console.log(` [  ${ ('OK'.green) }  ] Create Env`);
}
if(!fs.existsSync(file_env_storage)){
    console.log(` [ ${ ('Fail'.red) } ] Env not found`);
    fs.copyFileSync(file_env_example_storage, file_env_storage);
    console.log(` [  ${ ('OK'.green) }  ] Create Env`);
}
if(!fs.existsSync(file_env_backend)){
    console.log(` [ ${ ('Fail'.red) } ] Env not found`);
    fs.copyFileSync(file_env_example_backend, file_env_backend);
    console.log(` [  ${ ('OK'.green) }  ] Create Env`);
}
if(!fs.existsSync(file_env_common)){
    console.log(` [ ${ ('Fail'.red) } ] Env not found`);
    fs.copyFileSync(file_env_example_common, file_env_common);
    console.log(` [  ${ ('OK'.green) }  ] Create Env`);
}
if(!fs.existsSync(file_env_frontend)){
    console.log(` [ ${ ('Fail'.red) } ] Env not found`);
    fs.copyFileSync(file_env_example_frontend, file_env_frontend);
    console.log(` [  ${ ('OK'.green) }  ] Create Env`);
}
if(!fs.existsSync(file_env_game_machine)){
    console.log(` [ ${ ('Fail'.red) } ] Env not found`);
    fs.copyFileSync(file_env_example_game_machine, file_env_game_machine);
    console.log(` [  ${ ('OK'.green) }  ] Create Env`);
}
var continue_process = ()=>{};
// verify database shema exist
if(!fs.existsSync(path.join(dir_storage,'db'))){
    
    let file_storage_docker = path.join(dir_storage,'docker-compose.yml');

    execSync(`docker-compose -f ${file_storage_docker} down`);

    `docker-compose -f ${file_storage_docker} up`;
    let docker_compose = spawn('docker-compose',[ '-f', file_storage_docker, 'up']);

    let detectString = "database system is ready to accept connections";
    var isDetect = false;

    docker_compose.stderr.on('data', (data) => {

        // Detect Database READY FOR CONNECTIONS
        if((data.toString()+"").search(detectString) > 0){
            isDetect = true;
        };

    });

    var time_max = new Date().getMilliseconds() + 7000;
    // timeout
    var intervalId  = setInterval( ()=> {

        let time_now = new Date().getMilliseconds();

        if(isDetect){
            
            clearInterval(intervalId)

            console.log(` [ ${ ('OK'.green) } ] Docker Database up`);
            
            console.log(` [ ${ ('Init'.blue) } ] Database Set Shema from TypeORM`);

            exec(`cd ${dir_storage} && export DATABASE_HOST=localhost || set DATABASE_HOST=localhost && npm run schema:sync`,(err,stdout,stderr)=>{
                
                
                let detectStringSyncro = "Schema synchronization finished successfully.";
                if( (stdout+"").search(detectStringSyncro) > 0 ){
                    // Continue!!!
                    docker_compose.kill(2)
                    //console.log(stdout)
                    console.log(` [ ${ ('OK'.green) } ] Database Shema define`);
                    continue_process()

                } else {

                    console.log("ERRO:",err)
                    console.log("ERRO OUT:",stderr);
                    console.log(` [ ${ ('Fail'.red) } ] Syncronization DATABASE error`);
                    docker_compose.kill(2)

                }
                
                
                
            })
            

        }else if(time_now > time_max){
            
            clearInterval(intervalId)

            console.log(` [ ${ ('Fail'.red) } ] Docker Database error`);
            
            docker_compose.kill(2)
        }
    },500);

    docker_compose.on('exit', (code) => {
        if(code < 0)console.log(`Child exited with code ${code}`);
    }); 

    docker_compose.on('error', (err) => {
        console.log(` [ ${ ('Fail'.red) } ] Docker Database error`);
        console.log('Failed to start subprocess.');
    });

} else setTimeout(()=> continue_process(), 300);

continue_process = ()=>{

    console.log("Continuando processos!!!")

}
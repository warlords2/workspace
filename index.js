const { execSync } = require('child_process');
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


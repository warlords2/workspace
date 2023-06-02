const { execSync } = require('child_process');
let file = require('file-utils');
let fs =   require('fs-extra');
let colors = require('colors');
let path = require('path');

// Dir's Projects
let dir = path.join(__dirname);
let dir_audit = path.join(dir,'audit');
let dir_backend = path.join(dir,'backend');
let dir_common = path.join(dir,'common');
let dir_frontend = path.join(dir,'frontend');
let dir_game_machine = path.join(dir,'game_machine');

let audit_exist = fs.existsSync(path.join(dir_audit,'package.json'));
let backend_exist = fs.existsSync(path.join(dir_backend,'package.json'));
let common_exist = fs.existsSync(path.join(dir_common,'package.json'));
let frontend_exist = fs.existsSync(path.join(dir_frontend,'package.json'));
let game_machine_exist = fs.existsSync(path.join(dir_game_machine,'package.json'));

// verify dir's exist
if( !audit_exist || !backend_exist || !common_exist || !frontend_exist || !game_machine_exist ){
    console.log(` [ ${ ('fail'.red) } ] Project not found: `);

    if(!audit_exist)console.log( `\t + ${ (dir_audit.red) }` );

    if(!backend_exist)console.log( `\t + ${ (dir_backend.red) }` );

    if(!common_exist)console.log( `\t + ${ (dir_common.red) }` );

    if(!frontend_exist)console.log( `\t + ${ (dir_frontend.red) }` );

    if(!game_machine_exist)console.log( `\t + ${ (dir_game_machine.red) }` );

    execSync('git pull --recurse-submodules');

    return;
}

let file_env = path.join(dir,'.env');
let file_env_example = path.join(dir,'.env.EXAMPLE');

if(!fs.existsSync(file_env)){
    console.log(` [ ${ ('fail'.red) } ] Env not found`);
    fs.copyFileSync(file_env_example, file_env);
    console.log(` [ ${ ('OK'.green) } ] Create Env`);
}

let dotenv = require('dotenv');
dotenv.config({path:'./.env'});


// env file to project


from pathlib import Path
import re
from types import FunctionType
import os

cwd = Path(__file__).parent.parent
module_path = cwd/'src'/'modules'

temp_module_pth = Path(__file__).parent/'moduleTemplate'
type_hook_pth = cwd/'src'/'types'/'index.ts'
store_hook_pth = cwd/'src'/'stores'/'index.ts'
service_hook_pth = cwd/'src'/'services'/'index.ts'
module_hook_pth = module_path/'index.ts'
app_hook_pth = cwd/'App.tsx'

# stores/index
STORE_HOOK = '// <HOOK> export new module store </HOOK>'
# service/index
SERVICE_HOOK = '// <HOOK> export new module service </HOOK>'

# types
TYPE_EVENT_IMPORT_HOOK = '// <hook> import module events here </hook>'
TYPE_EVENT_ADD_TO_END_HOOK = '// <hook> add event type to end </hook>'

# modules/index
EXPORT_MODULE_HOOK = '// <HOOK> export module here </HOOK>'

# App
APP_PAGE_HOOK = '// <HOOK> import new Page here </HOOK>'
APP_NAVIGATION_HOOK = '/* <HOOK> register new page here </HOOK> */'


def print_blue(msg):
    print('\033[1;34m'+msg+'\033[0m')


def print_green(msg):
    print('\033[1;32m'+msg+'\033[0m')


def print_yellow(msg):
    print('\033[1;33m'+msg+'\033[0m')


def print_red(msg):
    print('\033[1;31m'+msg+'\033[0m')


def run_formatter(pth):
    os.system(f'yarn prettier -u --loglevel error -w {pth}')


def getModuleName():
    '''
    receive module name, and convert it to capitalized camelcase
    e.g returns 'ModuleName','MODULE_NAME
    '''
    module_name = input(
        '\033[1;34m'+'Plase input module Name (accepted format: module name or moduleName):'+'\033[0m')
    module_name = module_name.strip()
    upper_cased = ''
    if ' ' in module_name:
        module_name = ''.join(map(str.capitalize, module_name.split(' ')))
    else:
        module_name = module_name[0].upper() + module_name[1:]

    if(len(module_name) < 1):
        raise Exception('Invalid module name')
    upper_cased = '_'.join(re.findall(
        r'[A-Z][a-z0-9]{1,}', module_name)).upper()
    return module_name, upper_cased


def checkIfNameExisted(name):
    res = Path(module_path/name).is_dir()
    if res:
        return 'Module name already occupied, please choose another name.'
    return None


def getTemplates(name: str, upper_cased: str):
    '''
    read templates and replace keyword with provided module name
    '''
    files = temp_module_pth.iterdir()
    pths = []
    for f in files:
        if f.is_dir():
            pths.extend(f.glob('*.temp'))
        else:
            pths.append(f)

    constructed = []
    for pth in pths:
        txt = pth.read_text()
        txt = txt.replace('[ModuleName]', name).replace(
            '[ModuleNameUpperCased]', upper_cased)
        constructed.append({
            'pth': str(pth),
            'content': txt
        })
    print_green('Template content ready')
    return constructed


def _createDirs(module_name):
    '''
    create directorys
    '''
    (module_path/module_name).mkdir()
    (module_path/module_name/'service').mkdir()
    (module_path/module_name/'store').mkdir()
    (module_path/module_name/'event').mkdir()


def writeToTargetDir(templates, module_name):
    '''
    write templates to target dir
    '''
    _createDirs(module_name)
    for item in templates:
        pth, txt = item['pth'], item['content']
        pth = pth.replace(
            'scripts/moduleTemplate/', '').replace('.temp', '').replace('ModuleName', module_name)
        (module_path/module_name/pth).write_text(txt)


def _writeLineUpon(pth, pattern_obj):
    '''
    write text upon matched patterns
    '''
    pttns = pattern_obj.keys()
    with open(pth, 'r+') as f:
        lines = f.readlines()
        to_write = []
        for idx, line in enumerate(lines):
            for pattern in pttns:
                if pattern in line:
                    new_str = pattern_obj[pattern]
                    if(type(new_str) == str):
                        to_write.append(new_str+'\n')
                    elif(type(new_str) == FunctionType):
                        last_line = to_write[-1]
                        to_write[-1] = new_str(last_line)

            to_write.append(line)
        f.seek(0)
        f.truncate()
        f.writelines(to_write)
        f.close()


def linkConfig(module_name, upper_cased):
    '''
    add config snippets
    '''
    # src/stores/index.ts
    store_str = "export {[ModuleName]Store} from '@/modules/[ModuleName]/store/[ModuleName].store';"
    store_str = store_str.replace('[ModuleName]', module_name)
    _writeLineUpon(store_hook_pth, {STORE_HOOK: store_str})

    # src/services/index.ts
    service_str = "export {[ModuleName]Service} from '@/modules/[ModuleName]/service/[ModuleName].service';"

    service_str = service_str.replace('[ModuleName]', module_name)
    _writeLineUpon(service_hook_pth, {SERVICE_HOOK: service_str})

    # src/modules/index.ts
    module_str = "export {[ModuleName]Page} from './[ModuleName]';"
    module_str = module_str.replace('[ModuleName]', module_name)

    _writeLineUpon(module_hook_pth, {
                   EXPORT_MODULE_HOOK: module_str})

    # App.tsx
    app_str1 = "[ModuleName]Page,".replace('[ModuleName]', module_name)
    app_str2 = "<Stack.Screen name={'[ModuleName]'} component={[ModuleName]Page} />"
    app_str2 = app_str2.replace('[ModuleName]', module_name)
    _writeLineUpon(
        app_hook_pth, {APP_PAGE_HOOK: app_str1, APP_NAVIGATION_HOOK: app_str2})

    # src/types/index.ts
    type_str1 = "import {[ModuleName]Events} from '../modules/[ModuleName]';"
    type_str1 = type_str1.replace('[ModuleName]', module_name)

    def type_str2(last_line: str):
        tails = "&[ModuleName]Events;".replace(
            '[ModuleName]', module_name)
        return last_line.replace(';', tails)
    _writeLineUpon(type_hook_pth, {
        TYPE_EVENT_IMPORT_HOOK: type_str1,
        TYPE_EVENT_ADD_TO_END_HOOK: type_str2
    })


def format_files(module_name):
    run_formatter(module_path/module_name)
    run_formatter(store_hook_pth)
    run_formatter(service_hook_pth)
    run_formatter(module_hook_pth)
    run_formatter(app_hook_pth)
    run_formatter(type_hook_pth)


try:
    module_name, upper_cased = getModuleName()
    print_blue(f'Module name: {module_name}')
    res = checkIfNameExisted(module_name)
    if res != None:
        print_yellow(res)
        exit()
    templates = getTemplates(module_name, upper_cased)
    print_green('Templates ready')
    writeToTargetDir(templates, module_name)
    print_green('Module generated')
    linkConfig(module_name, upper_cased)
    print_green('Module linked')
    print_green('Formatting ...')
    format_files(module_name)
    print_green('All modified files formatted')
    print_green('Done')

except KeyboardInterrupt:
    print_blue('User interrupted')

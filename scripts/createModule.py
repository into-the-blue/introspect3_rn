from pathlib import Path
import re

cwd = Path(__file__).parent.parent
module_path = cwd/'src'/'modules'

temp_module_pth = Path(__file__).parent/'moduleTemplate'

store_hook_pth = cwd/'src'/'stores'/'index.ts'
service_hook_pth = cwd/'src'/'services'/'index.ts'
module_hook_pth = module_path/'index.ts'
app_hook_pth = cwd/'App.tsx'

# stores/index
STORE_HOOK = '// <HOOK> export new module store </HOOK>'
# service/index
SERVICE_HOOK = '// <HOOK> export new module service </HOOK>'

# modules/index
MODULE_STORE_HOOK = '// <HOOK> import module store here </HOOK>'
MODULE_VIEW_CONTROLLER_HOOK = '// <HOOK> import module view controller here </HOOK>'
MODULE_CONNECT_HOOK = '// <HOOK> connect module here </HOOK>'

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


def getModuleName():
    '''
    receive module name, and convert it to capitalized camelcase
    '''
    module_name = input(
        '\033[1;34m'+'Plase input module Name (accepted format: module name or moduleName):'+'\033[0m')
    module_name = module_name.strip()
    if ' ' in module_name:
        module_name = ''.join(map(str.capitalize, module_name.split(' ')))
    else:
        module_name = module_name[0].upper() + module_name[1:]

    if(len(module_name) < 1):
        raise Exception('Invalid module name')
    return module_name


def checkIfNameExisted(name):
    res = Path(module_path/name).is_dir()
    if res:
        return 'Module name already occupied, please choose another name.'
    return None


def getTemplates(name: str):
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
        txt = txt.replace('[ModuleName]', name)
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
        for line in lines:
            for pattern in pttns:
                if pattern in line:
                    to_write.append(pattern_obj[pattern]+'\n')
            to_write.append(line)
        f.seek(0)
        f.truncate()
        f.writelines(to_write)
        f.close()


def linkConfig(module_name):
    '''
    add config snippets
    '''
    store_str = "export {[ModuleName]Store} from '@/modules/[ModuleName]/store/[ModuleName].store';".replace(
        '[ModuleName]', module_name)
    _writeLineUpon(store_hook_pth, {STORE_HOOK: store_str})
    service_str = "export {[ModuleName]Service} from '@/modules/[ModuleName]/service/[ModuleName].service';".replace(
        '[ModuleName]', module_name)
    _writeLineUpon(service_hook_pth, {SERVICE_HOOK: service_str})
    module_str1 = "  [ModuleName]Store,".replace('[ModuleName]', module_name)
    module_str2 = "import {[ModuleName], [ModuleName]Controller} from './[ModuleName]';".replace(
        '[ModuleName]', module_name)
    module_str3 = """export const [ModuleName]Page = connect([ModuleName]Controller, {
  store: [ModuleName]Store.getReservedStore,
})([ModuleName]);""".replace('[ModuleName]', module_name)
    _writeLineUpon(module_hook_pth, {MODULE_STORE_HOOK: module_str1,
                   MODULE_VIEW_CONTROLLER_HOOK: module_str2, MODULE_CONNECT_HOOK: module_str3})
    app_str1 = "  [ModuleName]Page,".replace('[ModuleName]', module_name)
    app_str2 = "        <Stack.Screen name={'[ModuleName]'} component={[ModuleName]Page} />".replace(
        '[ModuleName]', module_name)
    _writeLineUpon(
        app_hook_pth, {APP_PAGE_HOOK: app_str1, APP_NAVIGATION_HOOK: app_str2})


try:
    module_name = getModuleName()
    print_blue(f'Module name: {module_name}')
    res = checkIfNameExisted(module_name)
    if res != None:
        print_yellow(res)
        exit()
    templates = getTemplates(module_name)
    print_green('Templates ready')
    writeToTargetDir(templates, module_name)
    print_green('Module generated')
    linkConfig(module_name)
    print_green('Module linked')
    print_green('Done')

except KeyboardInterrupt:
    print_blue('User interrupted')

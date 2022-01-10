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
APP_NAVIGATION_HOOK = '// <HOOK> register new page here </HOOK>'


def getModuleName():
    module_name = input(
        'Plase input module Name (accepted format: module name or moduleName):')
    module_name = module_name.strip()
    if ' ' in module_name:
        module_name = ''.join(map(str.capitalize, module_name.split(' ')))
    else:
        module_name = module_name[0].upper() + module_name[1:]

    if(len(module_name) < 1):
        raise Exception('Invalid module name')
    return module_name


def getTemplates(name: str):
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
    print('Template content ready')
    return constructed


def _createDirs(module_name):
    (module_path/module_name).mkdir()
    (module_path/module_name/'service').mkdir()
    (module_path/module_name/'store').mkdir()


def writeToTargetDir(templates, module_name):
    _createDirs(module_name)
    for item in templates:
        pth, txt = item['pth'], item['content']
        pth = pth.replace(
            'scripts/moduleTemplate/', '').replace('.temp', '').replace('ModuleName', module_name)
        (module_path/module_name/pth).write_text(txt)


def _writeLineUpon(pth, pattern, txt):
    with open(pth, 'r+') as f:
        lines = f.readlines()
        to_write = []
        for line in lines:
            if pattern in line:
                to_write.append(txt+'\n')
            to_write.append(line)
        f.seek(0)
        f.truncate()
        f.writelines(to_write)
        f.close()


def linkConfig(module_name):
    store_str = "export {[ModuleName]Store} from '@/modules/[ModuleName]/store/[ModuleName].store';".replace(
        '[ModuleName]', module_name)
    _writeLineUpon(store_hook_pth, STORE_HOOK, store_str)
    service_str = "export {[ModuleName]Service} from '@/modules/[ModuleName]/service/[ModuleName].service';".replace(
        '[ModuleName]', module_name)
    _writeLineUpon(service_hook_pth, SERVICE_HOOK, service_str)
    module_str1 = "  [ModuleName]Store,".replace('[ModuleName]', module_name)
    module_str2 = "import {[ModuleName], [ModuleName]Controller} from './[ModuleName]';".replace(
        '[ModuleName]', module_name)
    module_str3 = """export const [ModuleName]Page = connect([ModuleName]Controller.new(), {
  store: [ModuleName]Store,
})([ModuleName]);""".replace('[ModuleName]', module_name)
    _writeLineUpon(module_hook_pth, MODULE_STORE_HOOK, module_str1)
    _writeLineUpon(module_hook_pth, MODULE_VIEW_CONTROLLER_HOOK, module_str2)
    _writeLineUpon(module_hook_pth, MODULE_CONNECT_HOOK, module_str3)
    app_str1 = "  [ModuleName]Page,".replace('[ModuleName]', module_name)
    app_str2 = "Navigation.registerComponent('[ModuleName]', () => [ModuleName]Page);".replace(
        '[ModuleName]', module_name)
    _writeLineUpon(app_hook_pth, APP_PAGE_HOOK, app_str1)
    _writeLineUpon(app_hook_pth, APP_NAVIGATION_HOOK, app_str2)


try:
    module_name = getModuleName()
    print(f'Module name: {module_name}')
    templates = getTemplates(module_name)
    print('Templates ready')
    writeToTargetDir(templates, module_name)
    print('Module generated')
    linkConfig(module_name)
    print('Module linked')
    print('Done')

except KeyboardInterrupt:
    print('exit')

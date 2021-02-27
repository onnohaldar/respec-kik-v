# ResPec Tools [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Tools to help parse _Mark Down_ and other __ResPec-template__ reuse helpers. Based on a ResPec builded templates [see ResPec developers guide](https://github.com/w3c/respec/wiki/Developers-Guide).

## NPM installation

````shell
npm install https://github.com/onnohaldar/respec-tools.git --save
````

## respecmd-CLI

CLI to parse Content into Mark Down based ResPec-templates.

### Pre-conditions Mark Down Content

The next _Mark Down_ files should be available in the _input folder_:
- ABSTRACT(.md) file with _ResPec_ required abstract text
- SUMMARY(.md) file with _GitBook_ like content linking structure with only one level
- CONFORMANCE(.md) with _ResPec_ required conformance text

### Pre-conditions ResPec Template

The ResPec Template should contain
  
+- __index.html__ = _required_  
|  
+- __assets/__ = _not required (template-assets)_  
|  
+- __respec/__ = _required ResPec Profile (.js and .map)_

The rquired __index.html__ should contain:

```html
<!DOCTYPE html>
<html lang="(...)">
<head>
  <meta charset="utf-8">
  <title>...</title>
  <script src="./respec/respec-(...).js" async class="remove"></script>
  <script class="remove">
   // All config options at https://respec.org/docs/ 
   var respecConfig = {
      format: "markdown",
      maxTocLevel: (...),
    };
  </script>
</head>
<body>
  <=% mdSections %>
</body>
</html>
```

Notes:

- __(...)__ is required to fill with custom content
- __<=% mdSections %>__ the placeholder where the CLI will parse the sections to include the Mark Down file content 
  
See also example template [index.html](template/index.html)



### Command Line

Run CLI using NPX:

````bash
npx respecmd <template path> <content path> <output path>
````

Or as a script in "package.json".

| Parm | Description |
|---------|:------------|
| template path | ResPec HTML template directory |
| content path | Mark Down Content directory |
| output path | ResPec HTML distribution path |


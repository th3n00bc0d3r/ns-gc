#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const pkg = require('../package.json');

const [,, type, rawName] = process.argv;

// --version flag
if (type === '--version' || type === '-v') {
  console.log(`ns-gc version ${pkg.version}`);
  process.exit(0);
}

// --help flag
if (type === '--help' || type === '-h') {
  console.log(`
Usage:
  ns-gc c <component-name>    Generate a NativeScript Angular component
  ns-gc s <service-name>      Generate an Angular service
  ns-gc -v, --version         Show CLI version
  ns-gc -h, --help            Show help

Examples:
  ns-gc c login
  ns-gc c auth/login
  ns-gc s auth/user
`);
  process.exit(0);
}

if (!type || !rawName) {
  console.error("❌ Usage: ns-gc c <component-name> OR ns-gc s <service-name>");
  process.exit(1);
}

const isComponent = type === "c";
const isService = type === "s";

if (!isComponent && !isService) {
  console.error("❌ Invalid type. Use 'c' for component or 's' for service.");
  process.exit(1);
}

// Sanitize input
const sanitizedName = rawName.replace(/\/+$/, '').replace(/[^a-zA-Z0-9\/\-]/g, '');
const fileBase = sanitizedName.split('/').pop();
const className = fileBase.replace(/(^\w|\-\w)/g, m => m.replace('-', '').toUpperCase());

// Folder logic
const relativePath = isComponent
  ? sanitizedName.includes('/') ? path.join(path.dirname(sanitizedName), fileBase) : fileBase
  : sanitizedName.includes('/') ? path.dirname(sanitizedName) : "";

const targetDir = path.join("app", relativePath || ".");
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

// Safe file writer
const writeSafeFile = (filePath, content) => {
  if (fs.existsSync(filePath)) {
    console.error(`❌ File already exists: ${filePath}`);
    process.exit(1);
  }
  fs.writeFileSync(filePath, content);
};

// Component generation
if (isComponent) {
  const selectorName = sanitizedName.replace(/\//g, '-');

  const tsContent = `import { Component } from "@angular/core";
import { NativeScriptCommonModule } from '@nativescript/angular';

@Component({
  selector: "ns-${selectorName}",
  templateUrl: "./${fileBase}.component.html",
  standalone: true,
  styleUrls: ["./${fileBase}.component.css"],
  imports: [NativeScriptCommonModule],
})
export class ${className}Component {}
`;

  const htmlContent = `<StackLayout>
  <Label text="Hello from ${className}Component!"></Label>
</StackLayout>
`;

  const cssContent = `/* Styles for ${className}Component */`;

  writeSafeFile(path.join(targetDir, `${fileBase}.component.ts`), tsContent);
  writeSafeFile(path.join(targetDir, `${fileBase}.component.html`), htmlContent);
  writeSafeFile(path.join(targetDir, `${fileBase}.component.css`), cssContent);

  console.log(`✅ Component '${sanitizedName}' created in ${targetDir}/`);
}

// Service generation
if (isService) {
  const tsContent = `import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ${className}Service {
  constructor() { }
}
`;

  writeSafeFile(path.join(targetDir, `${fileBase}.service.ts`), tsContent);
  console.log(`✅ Service '${sanitizedName}' created in ${targetDir}/`);
}

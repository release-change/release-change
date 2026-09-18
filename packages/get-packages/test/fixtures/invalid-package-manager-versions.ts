export const invalidPackageManagerVersions = [
  "-bash: {{packageManager}}: command not found",
  "zsh: command not found: {{packageManager}}",
  `Command '{{packageManager}}' not found, but can be installed with:
sudo apt install {{packageManager}}`,
  "bash: {{packageManager}}: command not found",
  "sh: {{packageManager}}: not found",
  `{{packageManager}} : The term '{{packageManager}}' is not recognized as the name of a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
At line:1 char:1
+ {{packageManager}} --version
+ ~~~
    + CategoryInfo          : ObjectNotFound: ({{packageManager}}:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException`,
  "'{{packageManager}}' is not recognized as an internal or external command, operable program or batch file."
];

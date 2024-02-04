# File Manager

Welcome to the File Manager, a command-line interface (CLI) application built with Node.js APIs. This file manager allows you to perform various file operations, utilize Streams API, obtain information about the host machine's operating system, calculate file hashes, and compress/decompress files.

## Getting Started

To run the File Manager, make sure you have Node.js version 20 LTS installed on your machine. Follow these steps:

1. Clone this repository.
2. Open a terminal in the project directory.

```
npm install
npm run start -- --username=your_username
```

Replace your_username with your desired username.

## Commands

You can interact with the File Manager by entering commands in the console.

```
up
```

```
cd path_to_directory
```

```
ls
```

```
cat path_to_file
```

```
add new_file_name
```

```
rn path_to_file new_filename
```

```
cp path_to_file path_to_new_directory
```

```
mv path_to_file path_to_new_directory
```

```
rm path_to_file
```

```
os --EOL
```

```
os --cpus
```

```
os --homedir
```

```
os --username
```

```

```

os --architecture

```

```

```
hash path_to_file
```

```
compress path_to_file path_to_destination
```

```
decompress path_to_file path_to_destination
```

## Task

[Assignment: File Manager](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/file-manager/assignment.md)

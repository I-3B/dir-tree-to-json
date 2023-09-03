# dir-tree-to-json

a node script to convert a directory structure to a json file

## Usage

```bash
npx dir-tree-to-json <directory-path>
```

which would generate a json file representing the file structure of the passed directory

## Options

### `--only-directory`

```bash
npx dir-tree-to-json <directory-path> --only-directory
```

Will only output directories and omit files

### `--extensions`

```bash
npx dir-tree-to-json <directory-path> --extensions=mp4,json
```

Will only output files that ends with the provided extensions, if `--only-directory`` is present, this flag will be ignored

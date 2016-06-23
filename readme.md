# jellyfish

Lists projects that you have

# Usage

## Listing projects

List all projects in current directory and sub-directories (recursively)

```
jellyfish
```

List all projects in a specific directory

```
jellyfish ~/Projects
```

## Filtering for attributes

Only include the project's name

```
jellyfish -f name
```

Only include the project's name + description

```
jellyfish -f name,description
```

## Searching in attributes

Search by name

```
jellyfish -s name='something'
```

Search by name + description

```
jellyfish -s name='something',description='elese'
```

## Search + Filter

Search by name and only include name

```
jellyfish -f name -s name='something'
```

## List of options

```
jellyfish [options] [directory]
OR
jellyfish [directory] [options]
OR
jellyfish [options] [directory] [options]

DIRECTORY
  A absolute or relative path to where to start a recursive search
  Default to . which means current directory

OPTIONS
  --filter [-f] Filter to only include selected properties in results

    Examples: jellyfish -f name
              jellyfish -f name,description

  --search [-s] Search properties to include keywords

    Examples: jellyfish -s name='should-include this'
              jellyfish -s name='should-include this',description='and this'

  --debug [-d] Show debug/verbose output
```


## Properties to consider to add

ideas from npm

* bugs [link to issue tracker]
* license
* author/contributers
* repository
* package manager [composer / gx / npm]
* OS

ideas from composer

* stability [how stable it is]
* release_date / finish_date (not same as created_date)
* extra (anything else)

## Already added properties

* name
* description
* tags
* homepage
* type
* language
* active
* finished

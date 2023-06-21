import unidecode from 'unidecode';

// import punycode from 'node:punycode';
// export const filterInput = (str: string): string => punycode.toUnicode(str);

export const filterInput = (str: string): string => unidecode(str);

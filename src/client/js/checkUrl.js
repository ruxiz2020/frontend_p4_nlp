const SIMPLE_URL_REGEX = /^(https?:\/\/)?(\w+\.)?(\w+\.)(\w+)([\w\?\&\=\-]?)*(\/[\w\?\&\=\-]*)*$/g;

export const isUrlValid = url => !!url.match(SIMPLE_URL_REGEX);

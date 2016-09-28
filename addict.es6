const addict = require("./addictbg.es6");
const fs = require("fs");

const error = (msg) => {
    console.log("fatal error: " + msg);
    process.exit(0);
}

let args = process.argv.slice(2);

let opts = {
    "input": false
};

let flags = {
    "i": [1, (a) => opts.input = a]
};
flags["input"] = flags["i"]
// parse flags
for(let i = 0; i < args.length; i++){
    let arg = args[i];
    if(/^[-/]/.test(arg)){
        let flag = arg.slice(1);
        let fobj = flags[flag];
        
        if(!fobj)
            error("invalid flag `" + flag + "`");
        
        fobj[1](...args.splice(i + 1, fobj[0]));
    }
}

let fileName = args.shift();

let input = "";
if(opts["input"])
    input = fs.readFileSync(opts["input"]).toString();

let code = fs.readFileSync(fileName).toString();

const onEnd = () => {
    addict(code, input, (n) => process.stdout.write(n));
}

onEnd();
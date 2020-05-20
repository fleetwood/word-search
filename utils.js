const getRequires = (search, open, close) => {
    let active = false;
    let base = {
            index: -1,
            val: ''
        }
        , seek = base;
    let requires = [];

    for (let i = 0; i < search.length; i++) {
        let r = search[i];
        if (!active && r == open) {
            active = true;
            seek.index = i;
        }
        else if (active && r == close) {
            active = false;
            requires.push(seek);
            seek = {
                index: -1,
                val: ''
            };
        }
        else if (active) {
            seek.val += r;
        }
    }
    console.log(`Requires: ${JSON.stringify(requires)}`);
    return requires;
}

Object.defineProperty(String.prototype, 'stripSearch', {
    value() {
        let exp = new RegExp(/([\[\]\(\)\"\*])+/);
        let result = this;
        while (exp.test(result)) {
            result = result.replace(exp, '');
        }
        return result;
    }
})

Object.defineProperty(String.prototype, 'containSearch', {
    value(search, terms) {
        terms = terms.split('')
        let open = terms[0]
        , close = terms[1];
        let requires = getRequires(search, open, close);
        let results = true;
        requires.forEach(r => {
            if (this.indexOf(r.val) <0 ) {
                results = false;
            }
        });
        return results;
    }
})

Object.defineProperty(String.prototype, 'matchSearch', {
    value(search, terms) {
        terms = terms.split('')
        let open = terms[0]
        , close = terms[1];
        let requires = getRequires(search, open, close);
        let results = true;
        
        requires.forEach(r => {
            if (this.indexOf(r.val) != r.index) {
                results = false;
            }
        });
        return results;
    }
})

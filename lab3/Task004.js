function User(name) {
    this.name = name;
    this.getName = getName;
}

function getName() {
    return this.name;
}

const me = new User('Rex');

console.log(me.getName()); // Rex
import * as chai from 'chai';
var expect = chai.expect;

describe('about classes', () => {
  function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => Object
        .getOwnPropertyNames(baseCtor.prototype)
        .forEach(name => derivedCtor.prototype[name] = baseCtor.prototype[name]));
  }

  it('1-your first class', () => {
    class SuperHero {
      constructor(private firstName : string, private lastName : string) { }
      talk() : string {
          return `My favourite saying is : Hi my name is ${this.firstName} ${this.lastName}`;
      }
     } // _

    var hero = new SuperHero('Bruce', 'Wayne');
    expect(hero.talk()).to.equal('My favourite saying is : Hi my name is Bruce Wayne');
  });

  it('2-you can use getter and setters', () => {
    class Person { 
      public fullName : string;
      constructor(private firstName : string, private lastName : string) { 
        this.fullName = this.firstName + ' ' + this.lastName;
      }

    } // _

    var person = new Person('John', 'Doe');
    expect(person.fullName).to.equal('John Doe');
    person.fullName = 'Jane Doe';
    expect(person.fullName).to.equal('Jane Doe');
  });

  it('3-implement an interface', () => {
    interface IDeveloper {
      favouriteLanguage: string;
      sayHi(): string;
    }

    class Developer implements IDeveloper {
      constructor (public favouriteLanguage : string) { }
      sayHi() : string {
        return `Hello my favourite language is ${this.favouriteLanguage}`;
      }
    } // _

    var developer: IDeveloper = new Developer('TypeScript');
    expect(developer.sayHi()).to.equal('Hello my favourite language is TypeScript');
  });

  it('4-extend an other class', () => {
    class SuperHero {
      public name: string;
      public ability: string;
      constructor(name: string, ability: string) {
        this.name = name;
        this.ability = ability;
      }
      public talk() {
        return `I fight against evil with ${this.ability}`;
      }
    }

    class Sidekick extends SuperHero {
      constructor(name: string, ability: string, public master : SuperHero) {
        super(name, ability);
      }

      public talk() {
        return `${super.talk()} and my master is ${this.master.name}`;
      }
     } // _

    var batman = new SuperHero('Batman', 'Martial arts');
    var robin = new Sidekick('Robin', 'Stick', batman);
    expect(robin.talk()).to.equal('I fight against evil with Stick and my master is Batman');
  });

  it('5-share methods like in pure JS', () => {
    class Developer {
      public favouriteLanguage: string;

      constructor(favouriteLanguage: string) {
        this.favouriteLanguage = favouriteLanguage;
      }

      public sayHi() {
        return `Hello my favourite language is ${this.favouriteLanguage}`;
      }
    }

    var developer = new Developer('JavaScript');
    expect(developer.sayHi.call( new Developer('TypeScript') ))
      .to.equal('Hello my favourite language is TypeScript');
  });

  it('6-mix it', () => {
    class BackDeveloper {
      public static languages = ['CSharp'];
      public writeCSharp() {
        return true;
      }
    }

    class FrontDeveloper {
      public static languages = ['JavaScript', 'TypeScript'];
      public writeTypeScript() {
        return true;
      }
      public writeJavaScript() {
        return true;
      }
    }

    class FullStackDeveloper { 
      //public static languages = ['CSharp','JavaScript', 'TypeScript'];
      public static languages = [...BackDeveloper.languages, ...FrontDeveloper.languages];
      public talk() {
        return `Hello I'm a ${this.constructor.name} and I know ${this.constructor.languages.join(' and ')}`;
      }
    } // _

    var developer = new FullStackDeveloper();
    expect(developer.talk())
      .to.equal('Hello I\'m a FullStackDeveloper and I know CSharp and JavaScript and TypeScript');
    expect(developer.talk.call(new BackDeveloper()))
      .to.equal('Hello I\'m a BackDeveloper and I know CSharp');
    expect(developer.talk.call(new FrontDeveloper()))
      .to.equal('Hello I\'m a FrontDeveloper and I know JavaScript and TypeScript');
  });
});

function tajnica (command) {
  if (jeEnako(command.split(" ")[0], "pojdi")) {
    let destinacija = "";
    for (let i = 1; i < command.split(" ").length; i++) {
      destinacija += command.split(" ")[i] + " ";
    }
    destinacija = destinacija.slice(0, -1); 
    let ind  = -1;
    for (let i = 0; i < jaz.lokacija.vrata.length; i++) {
      // console.log(jaz.lokacija.vrata[i].ime, destinacija, jaz.lokacija.vrata[i].ime === destinacija);
      if (jeEnako(jaz.lokacija.vrata[i].ime, destinacija)) {
        ind = i;
        break;
      }
    }
    if (ind != -1) {
      jaz.premakniSe(jaz.lokacija.vrata[ind]);
    } else {
      echo("'"+ destinacija + "' ne obstajajo");
    }
  } else if (jeEnako(command, "poglej")) {
    jaz.lokacija.predstaviSe();
  } else {
    echo("Ne razumem");
  }
}

function jeEnako (a, b) {
  a = a.toLowerCase();
  b = b.toLowerCase();
  return a === b;
}

class Soba {
  constructor(ime, opis = "", predmeti = [], vrata = [], osebe = []) { // ime: string, opis: string, predmeti: [Predmet], vrata: [Vrata]
    this.ime = ime;
    this.opis = opis;
    this.predmeti = predmeti;
    this.vrata = vrata;
    this.osebe = osebe;
  }
  predstaviSe () {
    echo(this.ime, ["bold", true]);
    echo(this.opis);
    echo("Iz sobe vodijo: ");
    for (let i = 0; i < this.vrata.length; i++) {
      echo("- "+this.vrata[i].ime);
    }
    echo("V sobi lezijo predmeti: ");
    for (let i = 0; i < this.predmeti.length; i++) {
      echo("- " + this.predmeti[i].ime);
    }
  }
}

class Predmet {
  constructor(ime, opis = "", akcije = []) { // ime: string, opis: string, akcije: [Akcija]
    this.ime = ime;
    this.opis = opis;
    this.akcije = akcije;
  }
}

class Vrata {
  constructor (ime, opis = "", zakljenjeno = false, odprto = true, soba = undefined, par = undefined) { // ime: string, opis: string, zakljenjeno: boolean, odprto: boolean, soba: Soba, par: Vrata
    this.ime = ime;
    this.opis = opis;
    this.zakljenjeno = zakljenjeno;
    this.soba = soba;
    this.par = par;
    this.odprto = odprto;
  }
}

class Akcija {
  constructor (ime, funkcija = undefined) { // ime: string, funkcija: funkcija
    this.ime = ime;
    this.funkcija = funkcija;
  }
}

class Oseba {
  constructor (ime, lokacija, opis = "", inventar = []) { // ime: string, soba: Soba, opis: string, inventar: [predmeti]
    this.ime = ime;
    this.lokacija = lokacija;
    this.opis = opis;
    this.inventar = inventar;
  }
  premakniSe (skoziVrata) { // skoziVrata: Vrata
    this.lokacija.osebe.splice(this.lokacija.osebe.indexOf(skoziVrata), 1);
    this.lokacija = skoziVrata.par.soba;
    this.lokacija.osebe.push(this);
  }
}


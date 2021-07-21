const { Dog, Temperament, conn } = require("../../src/db")
const { expect } = require('chai');

describe('Model Testing', function() {
 
  describe('Dog model', function () {
    beforeEach(async function() {
      await Dog.sync({ force: true });
    });
    describe('Validations', function () {
      it('No deberia crearse sin los datos completos', function(done) {
        Dog.create({
          name: 'Rofo',
         })
          .then(() => done('No debería haberse creado'))
          .catch(() => done());
      });
      it('No deberia crearse sin los datos completos', function(done) {
        Dog.create({
          height: 'ARG',
        })
        .then(() => done('No deberia haberse creado'))
        .catch(() => done());
      });
    });
  })
  describe('Temperament model', function () {
    beforeEach(async function() {
      await Temperament.sync({ force: true });
    });
        it('No deberia crearse sin los datos completos', function(done) {
          Temperament.create({
          id: '11',
        })
        .then(() => done('No deberia haberse creado'))
        .catch(() => done());
      });
      it('Name deberia ser un string', function(){
        expect(typeof Temperament.name).equal("string")
      })
    });
})
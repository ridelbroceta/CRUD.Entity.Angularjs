using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CRUD.WEBAPI.Angularjs.Models;

namespace CRUD.WEBAPI.Angularjs.Controllers
{
    
    public class PersonController : ApiController
    {
        private readonly DatabaseEntities db = new DatabaseEntities();


        // GET api/values
        [HttpGet]
        public IEnumerable<Person> Get()
        {
            return db.Persons;
        }

        // GET api/values/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]Person person)
        {
            if (!string.IsNullOrEmpty(person.Name))
            {
                var newId = 1;
                if (db.Persons.Any())
                {
                    newId += db.Persons.Select(p => p.Id).Max();
                }
                person.Id = newId;
                db.Persons.Add(person);
                db.SaveChanges();
            }
        }

        [HttpPut]
        public void Put(int id, string name)
        {
            var person = db.Persons.FirstOrDefault(p => p.Id == id);
            if ((person != null) && !string.IsNullOrEmpty(name))
            {
                person.Name = name;
                db.Entry(person).State = EntityState.Modified; 
                db.SaveChanges();
            }

        }

        // DELETE api/values/5
        [HttpDelete]
        public void Delete(int id)
        {
            var person = db.Persons.FirstOrDefault(p => p.Id == id);
            if (person != null)
            {
                db.Persons.Remove(person);
                db.SaveChanges();
            }
            
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BloodDonation.Models;
using BloodDonation.Auth;
using System.Web;
using System.Web.Http.Cors;

namespace BloodDonation.Controllers
{
  /*  [RoutePrefix("api/home")]*/
    public class HomeController : ApiController
    {
        BloodDonationDBEntities context = new BloodDonationDBEntities();


        [Route("api/admin")]
        public IHttpActionResult Get()
        {
            var user = context.userInfoes.Where(x => x.Type == "Admin").ToList();

            // return StatusCode(HttpStatusCode.NoContent);
            //return Ok(context.userInfoes.ToList());
            return Ok(user);
        }


        [Route("api/admin/{id}")]
        public IHttpActionResult Get(int id)
        {
            userInfo user = context.userInfoes.Find(id);
            if (user == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }

            return Ok(user);
        }

        [Route("api/login"),HttpPost] 
        public IHttpActionResult login(userInfo user)
        {
            var type = "none";

            //bool data = context.userInfoes.Any(x => x.Email == user.Email && x.Password == user.Password);
            var data = context.userInfoes.Where(x => x.Email == user.Email && x.Password == user.Password).FirstOrDefault<userInfo>();

            if (data != null)
            {
                type = data.Type;

                return Json(type);


            }

            return Json(type);
        }


        [Route("api/contactus"), HttpPost]
        public IHttpActionResult PostContactUs(contactU data)
        {
            var type = "none";
            context.contactUs.Add(data);
            context.SaveChanges();

            return Json(type);
        }

        [Route("api/contactus"), HttpGet]
        public IHttpActionResult GetContactUs()
        {
            return Ok(context.contactUs.ToList());
        }


    }
}
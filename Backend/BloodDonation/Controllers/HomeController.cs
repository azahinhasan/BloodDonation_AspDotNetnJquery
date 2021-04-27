using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BloodDonation.Models;
using System.Web.Http.Cors;
using System.Web.Http;

namespace BloodDonation.Controllers
{
    public class HomeController : ApiController
    {
        BloodDonationContext context = new BloodDonationContext();


        [Route("api/home")]
        public IHttpActionResult Get()
        {
            var user = context.Userinfos.Where(x => x.Type == "Admin").FirstOrDefault<userinfo>();

            // return StatusCode(HttpStatusCode.NoContent);
            //return Ok(context.userInfoes.ToList());
            // return Ok(user);
            return Json(user);
        }


        [Route("api/login"), HttpPost]
        public IHttpActionResult login(userinfo user)
        {
            var type = "none";

            //bool data = context.userInfoes.Any(x => x.Email == user.Email && x.Password == user.Password);
            var data = context.Userinfos.Where(x => x.Email == user.Email && x.Password == user.Password).FirstOrDefault<userinfo>();

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
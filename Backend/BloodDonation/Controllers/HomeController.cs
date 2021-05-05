using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BloodDonation.Models;
using System.Web.Http.Cors;
using System.Web.Http;
using BloodDonation.Attributes;
using System.Threading;


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


        [Route("api/login"), HttpPost,AuthLogin]
        //public IHttpActionResult login(userinfo user)
        public IHttpActionResult login()
        {
            var type = "none";


            //bool data = context.userInfoes.Any(x => x.Email == user.Email && x.Password == user.Password);
            //var data = context.Userinfos.Where(x => x.Email == user.Email && x.Password == user.Password).FirstOrDefault<userinfo>();

            var data = context.Userinfos.Where(x => x.Email == Thread.CurrentPrincipal.Identity.Name).FirstOrDefault<userinfo>();
            //var data = context.Userinfos.Where(x => x.userId == 2).FirstOrDefault<userinfo>();

            if (data != null)
            {

                type = data.Type;
                string[] result = { data.Type, data.BanStatus };

                return Json(result);

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
            //return Ok(context.contactUs.ToList());
        }


    }
}
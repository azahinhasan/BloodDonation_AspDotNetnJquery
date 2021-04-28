using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BloodDonation.Models;
using System.Web.Http.Cors;
using System.Web.Http;

namespace BloodDonation.Controllers
{
    public class AdminController : ApiController
    {
        BloodDonationContext context = new BloodDonationContext();


        [Route("api/employee"), HttpPost]
        public IHttpActionResult AddEmployee(userinfo info)
        {
            var rand = new Random();
            Salary infoSalary = new Salary();
            var path = "";
            var type = "none";
            bool data = context.Userinfos.Any(x => x.Email == info.Email);

            if (!data)
            {
                info.Password = rand.Next(300, 901).ToString() + "azhe";
                info.darkMood = "no";
                context.Userinfos.Add(info);
                context.SaveChanges();
                infoSalary.userId = info.userId;
                infoSalary.Year = 2021;
                context.Salaries.Add(infoSalary);
                context.SaveChanges();
                return Json(info.Password);

            }

            if (data)
            {
                type = "emailExist";
                return Json(type);

            }

            return Json(type);
        }






        [Route("api/employee"), HttpGet]
        public IHttpActionResult GetEmployeeList()


        {

            var data = context.Userinfos.Where(x => x.Type == "Admin" || x.Type == "Moderator").ToList();
            //context.Links.Add(new Link() { Url = "https://localhost:44382/api/categories", Method = "POST", Relation = "Create a New Catogory" });

            return Ok(data);
        }

        [Route("api/employee/{id}"), HttpGet]
        public IHttpActionResult GetEmployee(int id)
        {

            //bool data = context.userInfoes.Any(x => x.Email == user.Email && x.Password == user.Password);
            var data = context.Userinfos.Find(id);

            return Ok(data);
        }

        [Route("api/employeeTypeChange/{id}"), HttpGet]
        public IHttpActionResult TypeChangeEmployee([FromUri] int id)
        {


            var data = context.Userinfos.Where(r => r.userId == id).FirstOrDefault<userinfo>();
            if (data.Type == "Moderator")
            {
                data.Type = "Admin";
            }
            else
            {
                data.Type = "Moderator";
            }


            context.Entry(data).State = System.Data.Entity.EntityState.Modified;
            context.SaveChanges();

            return Ok(data);
        }


        [Route("api/salary"), HttpGet]
        public IHttpActionResult Getsalery()
        {

            //bool data = context.userInfoes.Any(x => x.Email == user.Email && x.Password == user.Password);
            var data = context.Salaries.ToList();

            return Ok(data);
        }

        [Route("api/salary/{id}"), HttpGet]
        public IHttpActionResult GetsaleryID([FromUri] int id)
        {

            //bool data = context.userInfoes.Any(x => x.Email == user.Email && x.Password == user.Password);
            var data = context.Salaries.Where(x => x.userId == id).ToList();


            return Ok(data);
        }

        [Route("api/salary/{id}/{month}/{year}/{add}"), HttpPost]
        public IHttpActionResult Paysalery([FromUri]int id, [FromUri] string month, [FromUri] int year, [FromUri] string add)
        {
            var data = context.Salaries.Where(x => x.userId == id && x.Year == year).FirstOrDefault<Salary>();

            if (data == null)
            {
                Salary infoSalary = new Salary();

                infoSalary.userId = id;
                infoSalary.Year = year;
                context.Salaries.Add(infoSalary);
                context.SaveChanges();
                data = context.Salaries.Where(x => x.userId == id && x.Year == year).FirstOrDefault<Salary>();

            }

            if (add == "yes")
            {
                if (month == "January")
                {
                    data.January = "yes";
                }
                if (month == "February")
                {
                    data.February = "yes";
                }
                if (month == "March")
                {
                    data.March = "yes";
                }
                if (month == "April")
                {
                    data.April = "yes";
                }
                if (month == "May")
                {
                    data.May = "yes";
                }
                if (month == "June")
                {
                    data.June = "yes";
                }
                if (month == "July")
                {
                    data.July = "yes";

                }
                if (month == "August")
                {
                    data.August = "yes";
                }
                if (month == "September")
                {
                    data.September = "yes";
                }
                if (month == "October")
                {
                    data.October = "yes";

                }
                if (month == "November")
                {
                    data.November = "yes";

                }
                if (month == "December")
                {
                    data.December = "yes";

                }

            }
            if (add == "no")
            {
                if (month == "January")
                {
                    data.January = "no";
                }
                if (month == "February")
                {
                    data.February = "no";
                }
                if (month == "March")
                {
                    data.March = "no";
                }
                if (month == "April")
                {
                    data.April = "no";
                }
                if (month == "May")
                {
                    data.May = "no";
                }
                if (month == "June")
                {
                    data.June = "no";
                }
                if (month == "July")
                {
                    data.July = "no";

                }
                if (month == "August")
                {
                    data.August = "no";
                }
                if (month == "September")
                {
                    data.September = "no";
                }
                if (month == "October")
                {
                    data.October = "no";

                }
                if (month == "November")
                {
                    data.November = "no";

                }
                if (month == "December")
                {
                    data.December = "no";

                }

            }


            //

            context.Entry(data).State = System.Data.Entity.EntityState.Modified;
            context.SaveChanges();


            return Ok(data);
        }



        [Route("api/StatisticsAllUser"), HttpGet]
        public IHttpActionResult StatisticsAllUser()
        {

            var data = context.Userinfos.Where(r => r.Type == "Admin").ToList();
            int adminCount = data.Count;
            data = context.Userinfos.Where(r => r.Type == "Moderator").ToList();
            int ModeratorCount = data.Count;
            data = context.Userinfos.Where(r => r.Type == "Donner").ToList();
            int DonerCount = data.Count;
            data = context.Userinfos.Where(r => r.Type == "User").ToList();
            int UserCount = data.Count;
            
            int[] myNum = { adminCount, ModeratorCount, UserCount, DonerCount };

            return Ok(myNum);
        }

        [Route("api/StatisticsAllBanUser"), HttpGet]
        public IHttpActionResult StatisticsAllBanUser()
        {

            var data = context.Userinfos.ToList();
            int TotalUserCount = data.Count;
            var data2 = context.Userinfos.Where(x=> x.BanStatus == "yes").ToList();
            int BanUserCount = data2.Count;
            int notBanUserCount = TotalUserCount - BanUserCount;

            int[] myNum = { TotalUserCount, notBanUserCount, BanUserCount };

            return Json(myNum);
        }

        [Route("api/allReports"), HttpGet]
        public IHttpActionResult getAllReports()
        {

            var data = context.reports.ToList();
            return Ok(data);
        }

        [Route("api/banUserInfo/{id}"), HttpGet]
        public IHttpActionResult banUserInfo(int id)
        {

            var data = context.Userinfos.Where(x=> x.userId == id).FirstOrDefault<userinfo>();

            return Ok(data);
        }

        [Route("api/banUnbanUser/{id}"), HttpPost]
        public IHttpActionResult banUser(int id)
        {
            var data = context.Userinfos.Where(x => x.userId == id).FirstOrDefault<userinfo>();

            if (data.BanStatus=="yes")
            {
                data.BanStatus = "no";
            }
            else
            {
                data.BanStatus = "yes";
            }

            context.Entry(data).State = System.Data.Entity.EntityState.Modified;
            context.SaveChanges();

            return Ok(data);
        }

        [Route("api/contactUsList"), HttpGet]
        public IHttpActionResult contactUsList()
        {

            var data = context.contactUs.ToList();

            return Ok(data);
        }

    }
}
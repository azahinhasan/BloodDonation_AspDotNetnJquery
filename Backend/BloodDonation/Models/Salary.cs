using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using System.Xml.Serialization;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BloodDonation.Models
{
    public class Salary
    {
        public int id { get; set; }
        public int userId { get; set; }
        public string January { get; set; }
        public string February { get; set; }
        public string March { get; set; }
        public string April { get; set; }
        public string May { get; set; }
        public string June { get; set; }
        public string July { get; set; }
        public string August { get; set; }
        public string September { get; set; }
        public string October { get; set; }
        public string November { get; set; }
        public string December { get; set; }
        public Nullable<int> Year { get; set; }

        public virtual userinfo userInfo { get; set; }

        [NotMapped]
        List<Link> links = new List<Link>();
        [NotMapped]
        public List<Link> Links { get { return links; } }

    }
}
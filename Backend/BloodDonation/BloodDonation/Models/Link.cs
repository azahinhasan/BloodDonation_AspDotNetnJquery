using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BloodDonation.Models
{
    public class Link
    {
        public int id { get; set; }
        public string Url { get; set; }
        public string Method { get; set; }
        public string Relation { get; set; }
    }
}
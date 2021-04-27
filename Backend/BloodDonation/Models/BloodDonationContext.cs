using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations.Schema;
using BloodDonation.Migrations;


//using BloodDonation.Migrations;

namespace BloodDonation.Models
{
    public class BloodDonationContext:DbContext
    {

        public BloodDonationContext() : base("name=CFBloodDonationContext")
        {
            //it will create DB for fast time..but for 2nd time it will give a error
            //1. new CreateDatabaseIfNotExists<InventoryDbContext>();
            //2. new DropCreateDatabaseIfModelChanges<Inv entoryDbContext>();
            //3. new DropCreateDatabaseAlways<InventoryDbContext>();
            //4. Custom

            //Database.SetInitializer(new DropCreateDatabaseIfModelChanges<InventoryDbContext>());
            //folowing part is for migration
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<BloodDonationContext, Configuration>());

        }


        public DbSet<userinfo> Userinfos { set; get; }
        public DbSet<Salary> Salaries { set; get; }
        public DbSet<bannedUser> bannedUsers { set; get; }
        public DbSet<BloodBook> bloodBooks { set; get; }
        public DbSet<contactU> contactUs { set; get; }
        public DbSet<DisabledAccount> disabledAccounts { set; get; }
        public DbSet<DonationForSystem> donationForSystems { set; get; }
        public DbSet<donorRating> donorRatings { set; get; }
        //public DbSet<FlagPost> flagPosts { set; get; }
        public DbSet<Link> links { set; get; }
        public DbSet<Post> posts { set; get; }
        public DbSet<report> reports { set; get; }
        public DbSet<RequestBlood> requestBloods { set; get; }
      


    }
}
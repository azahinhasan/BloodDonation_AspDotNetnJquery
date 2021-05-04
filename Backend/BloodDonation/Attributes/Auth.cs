using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Security.Principal;
using BloodDonation.Models;

namespace BloodDonation.Attributes
{
    public class Auth:AuthorizationFilterAttribute
    {
        // go to postman in Headers to disable authorizaton option
        public override void OnAuthorization(HttpActionContext actionContext)
        {
            base.OnAuthorization(actionContext);

            if (actionContext.Request.Headers.Authorization == null)
            {
                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized);
            }
            else
            {
                string encoded = actionContext.Request.Headers.Authorization.Parameter;
                string decoded = Encoding.UTF8.GetString(Convert.FromBase64String(encoded));
                string[] splittedText = decoded.Split(new char[] { ':' });
                string email = splittedText[0];
                string type = splittedText[1];

                BloodDonationContext context = new BloodDonationContext();
                var data = context.Userinfos.Where(x => x.Email == email && x.Type == type).FirstOrDefault<userinfo>();

                if (type == "Admin")
                {
                   // Thread.CurrentPrincipal = new GenericPrincipal(new GenericIdentity("Bob", "Passport"), null); //in null position ther will user Role

/*                    IPrincipal threadPrincipal = Thread.CurrentPrincipal;
                    var a = threadPrincipal.Identity.Name;
                    if (threadPrincipal.Identity.Name == "Bob")
                    {
                        a = threadPrincipal.Identity.Name;
                    }
                    else
                    {
                        a = threadPrincipal.Identity.Name;
                    }*/
                }
                else
                {
                    actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized);
                }

            }
        }
    }
}
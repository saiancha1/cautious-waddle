using System;
using System.Collections.Generic;
using Google.Apis.AnalyticsReporting.v4.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using cautious_waddle.Helpers;
using Google.Apis.AnalyticsReporting.v4;

namespace cautious_waddle.Controllers
{
    [Route("/api/[controller]")]
    public class AdminController : Controller
    {
        [HttpGet("analytics")]
        [Authorize(Roles="Admin")]
        public IActionResult GetAnalyticsData (string startDate = null, string endDate = null)
        {
            string email =   "capstone-project@capstone1-1538427977793.iam.gserviceaccount.com";

            AnalyticsReportingService service = AnalyticsHelper.AuthenticateServiceAccount(email);
            // Create the DateRange object.
            DateRange dateRange = new DateRange() { StartDate = (string.IsNullOrEmpty(startDate))?
            DateTime.Now.AddDays(-30).ToString("yyyy-MM-dd") : startDate, 
            EndDate = (string.IsNullOrEmpty(endDate)? DateTime.Now.ToString("yyyy-MM-dd") : endDate) };

            // Create the Metrics object.
            //Metric sessions = new Metric { Expression = "ga:sessions", Alias = "Sessions" };
            Metric pageViews = new Metric { Expression = "ga:pageviews", Alias = "PageViews" };

            //Create the Dimensions object.
            Dimension pagePath = new Dimension { Name = "ga:pagePath" };

            // Create the ReportRequest object.
            // Create the ReportRequest object.
            ReportRequest reportRequest = new ReportRequest
            {
                ViewId = "183068054",
                DateRanges = new List<DateRange>() { dateRange },
                Dimensions = new List<Dimension>() {pagePath },
                Metrics = new List<Metric>() { pageViews }
            };

            List<ReportRequest> requests = new List<ReportRequest>();
            requests.Add(reportRequest);

            // Create the GetReportsRequest object.
            GetReportsRequest getReport = new GetReportsRequest() { ReportRequests = requests };

            // Call the batchGet method.
            GetReportsResponse response = service.Reports.BatchGet(getReport).Execute();
            return Ok(response);
        }
    }
}
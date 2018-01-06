
using Fizzler.Systems.HtmlAgilityPack;
using HtmlAgilityPack;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Scraper
{
    class Program
    {
        static void Main(string[] args)
        {
            var rootTripsUrl = "https://www.legendarytrips.com/wp-admin/admin-ajax.php?action=get_results&paged=1&sfid=7379";
            var tripsClient = new TripsLinkScraper();
            var pageCounter = 2;
            var scrapedTripsLinks = new List<string>();
            var scrapedResult = tripsClient.Request(rootTripsUrl);
            scrapedTripsLinks.AddRange(scrapedResult);

            while (scrapedResult.Any())
            {
                rootTripsUrl = $"https://www.legendarytrips.com/wp-admin/admin-ajax.php?action=get_results&paged={pageCounter}&sfid=7379";
                scrapedResult = tripsClient.Request(rootTripsUrl);
                scrapedTripsLinks.AddRange(scrapedResult);
                pageCounter++;
            }

            var allTrips = new ConcurrentBag<Trip>();
            var progress = 0;
            Parallel.ForEach(scrapedTripsLinks, tripLink =>
            {
                Console.WriteLine(progress.ToString() + ": " + tripLink);
                progress++;
                allTrips.Add(new TripScraper().Request(tripLink));
            });



            var json = Newtonsoft.Json.JsonConvert.SerializeObject(allTrips);
            File.WriteAllText("AllTrips.json", json);
        }
    }
}

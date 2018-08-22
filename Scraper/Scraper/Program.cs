
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
            var allTrips = new HashSet<string>();
            var rootPage = new HtmlDocument();
            rootPage.LoadHtml(File.ReadAllText("2000.html"));
            var cards = rootPage.DocumentNode.QuerySelectorAll(".tripcard-container a")
                .Select(node => node.Attributes["href"].Value).Where(link => link.Contains("/trip/")).Distinct().ToList();
            var bag = new ConcurrentBag<TripotoModel>();
            var doneCounter = 0;
            var locker = new Object();



        Parallel.ForEach(cards, new ParallelOptions() { MaxDegreeOfParallelism = 4 } , card => 
            {
                var trip = new TripotoModel();
                try
                {
                    trip.FromUrl(card);
                    bag.Add(trip);
                    doneCounter++;
                    Console.WriteLine(doneCounter);

                    lock (locker)
                    {
                        if (bag.Count % 5 == 0)
                        {
                            var json = Newtonsoft.Json.JsonConvert.SerializeObject(bag);
                            File.AppendAllText("AllTrips2.json", json);
                            bag = new ConcurrentBag<TripotoModel>();
                        }
                    }
                }
                catch (Exception)
                {
                }
            });
        }
    }
}

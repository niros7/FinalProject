using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Fizzler.Systems.HtmlAgilityPack;
using HtmlAgilityPack;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;

namespace Scraper
{
    public class TripotoModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int Duration { get; set; }
        public List<string> Destinations { get; set; }
        public string Link { get; set; }
        public string Text { get; set; }
        public List<string> Tags { get; set; }
        public List<string> Locations { get; set; }

        public TripotoModel()
        {
            Description = string.Empty;
            Tags = new List<string>(0);
            Destinations = new List<string>();
            Locations = new List<string>();
            Duration = -1;
        }

        public void FromUrl(string url)
        {
            var webClient = new WebClient();
            var html = webClient.Get(url);
            var website = html.DocumentNode;

            Title = website.QuerySelectorAll("h1.trip-title").First().InnerText.Trim();
            Text = website.QuerySelectorAll("article").First().InnerText.Trim();
            Link = url;

            var durationTask = Task.Factory.StartNew(() => getDuration(url));
            var destinationsTask = Task.Factory.StartNew(() => getDestinations(website));

            Task.WaitAll(new Task[] { durationTask, destinationsTask });

            if (Duration == -1 && Destinations.Any())
            {
                Duration = Destinations.Count * 2;
            }
        }

        private void getDuration(string url)
        {
            var driver = new ChromeDriver();
            driver.Navigate().GoToUrl(url);

            var wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
            var element = wait.Until(x => x.FindElement(By.Id("wishlist-share-section-desktop")));

            var duration = driver.FindElementsByClassName("line-height-1").ToList().Where(x => x.Text.Contains("Days")).FirstOrDefault();
            if (duration != null)
            {
                Duration = int.Parse(Regex.Match(duration.Text, @"\d+").Value);
            }
            driver.Quit();
        }

        private void getDestinations(HtmlNode website)
        {
            string mapUrl = null;

            var attr = "data-label";
            foreach (var node in website.SelectNodes($"//*[@{attr}]"))
            {
                if (node.GetAttributeValue(attr, "") == "map")
                {
                    mapUrl = node.GetAttributeValue("href", "");
                    break;
                }
            }

            if (mapUrl == null) return;
            var driver = new ChromeDriver();

            driver.Navigate().GoToUrl(mapUrl);

            var wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
            var element = wait.Until(x =>  x.FindElement(By.Id("spot-accordian")));

            foreach (var card in driver.FindElementsByCssSelector("h2 span"))
            {
                if (!string.IsNullOrWhiteSpace(card.Text))
                {
                    Destinations.Add(card.Text);
                }
            }

            Destinations = Destinations.Distinct().ToList();

            driver.Quit();
        }
    }
}

using Fizzler.Systems.HtmlAgilityPack;
using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;

namespace Scraper
{
    public class TripsLinkScraper
    {
        public WebClient webClient { get; set; }
        public TripsLinkScraper()
        {
            webClient = new WebClient();
        }
        public List<string> Request(string url)
        {
            var html = webClient.Get(url);
            return html.DocumentNode.QuerySelectorAll("div.img a")
                .Select(node => node.Attributes["href"].Value).Distinct().ToList();

        }


    }
}

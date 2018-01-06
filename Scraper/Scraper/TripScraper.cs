using Fizzler.Systems.HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Scraper
{
    public class TripScraper
    {
        public WebClient webClient { get; set; }
        public TripScraper()
        {
            webClient = new WebClient();
        }
        public Trip Request(string url)
        {
          

            var steps = new List<string>();
            var html = webClient.Get(url);
            var stepBlock = html.DocumentNode.QuerySelectorAll("div.block_out");

            if (stepBlock.Count() == 0)
            {
                return null;
            }

            var title = html.DocumentNode.QuerySelectorAll("div.title_1 h2").First().InnerText.Trim();

            var subTitle = html.DocumentNode.QuerySelectorAll("div.title_1 span").FirstOrDefault()?.InnerText.Trim();
            var duration = html.DocumentNode.QuerySelectorAll("div.line_1.line_2.line_duration").FirstOrDefault()?.Children().ToArray()[2].InnerText.Trim();
            var destinations = html.DocumentNode.QuerySelectorAll("div.listCon a").Select(dest => dest.InnerText).ToList<string>();

            var themes = html.DocumentNode.QuerySelectorAll("div.activi span").Select(theme => theme.InnerText).ToList<string>();
            themes.RemoveAt(0);
            

            var stepsInTrip = new List<Tuple<string, string>>(stepBlock.Count());

            foreach (var step in stepBlock)
            {
                var stepTitle = step.QuerySelectorAll("h6").First().InnerText.Trim();
                var stepContent = step.QuerySelectorAll("div").Select(x => x.InnerText).Aggregate((curr, next) => curr + " " + next).Trim();
                stepsInTrip.Add(new Tuple<string, string>( stepTitle, stepContent));
            }


            return new Trip
            {
                Link = url,
                Destinations = destinations,
                Duration = duration,
                Steps = stepsInTrip,
                SubTitle = subTitle,
                Themes = themes,
                Title = title
            };
        }
    }
}

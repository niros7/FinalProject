using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Scraper
{
    public class Trip
    {
        public string Link { get; set; }
        public string Title { get; set; }
        public string SubTitle { get; set; }
        public List<string> Destinations { get; set; }

        public string Duration { get; set; }
        public List<string> Themes { get; set; }

        // tuple of title and step
        public List<Tuple<string, string>> Steps { get; set; }
    }
}

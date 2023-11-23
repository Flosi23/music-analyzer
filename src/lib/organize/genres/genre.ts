export const genres = [
	"classical",
	"emo",
	"abstract",
	"hip hop",
	"edm",
	"house",
	"jazz",
	"rock",
	"techno",
	"trance",
	"blues",
	"cover",
	"punk",
	"pop",
	"rap",
	"traditional",
	"gospel",
	"metal",
	"afrobeat",
	"drill",
	"funk",
	"r&b",
	"soul",
	"phonk",
	"country",
	"lo-fi",
	"fusion",
	"orchestra",
	"reggae",
	"trap",
	"dnb",
	"piano",
	"latin",
	"folk",
	"ost",
	"swing",
	"dubstep",
	"garage",
	"k-pop",
	"j-pop",
	"samba",
] as const;

export type Genre = (typeof genres)[number];

type Origin =
	| "afghan"
	| "african"
	| "afrikaans"
	| "afro"
	| "alabama"
	| "algerian"
	| "american"
	| "arab"
	| "atlanta"
	| "australian"
	| "argentine"
	| "asian"
	| "belarusian"
	| "belgian"
	| "berlin"
	| "birmingham"
	| "boston"
	| "bosnian"
	| "brazilian"
	| "british"
	| "bulgarian"
	| "canadian"
	| "chinese"
	| "christian"
	| "colombian"
	| "croatian"
	| "cuban"
	| "czech"
	| "danish"
	| "detroit"
	| "dutch"
	| "ecuadorian"
	| "egyptian"
	| "estonian"
	| "finnish"
	| "florida"
	| "french"
	| "georgian"
	| "german"
	| "ghanaian"
	| "greek"
	| "haitian"
	| "hamburg"
	| "hawaiian"
	| "hungarian"
	| "icelandic"
	| "indian"
	| "indonesian"
	| "iranian"
	| "irish"
	| "israeli"
	| "italian"
	| "jamaican"
	| "japanese"
	| "kenyan"
	| "korean"
	| "kurdish"
	| "lesotho"
	| "libyan"
	| "lithuanian"
	| "louisiana"
	| "london"
	| "luxembourgian"
	| "macedonian"
	| "malawian"
	| "malaysian"
	| "marathi"
	| "melbourne"
	| "mexican"
	| "michigan"
	| "mongolian"
	| "moroccan"
	| "myanmar"
	| "nordic"
	| "norwegian"
	| "nz"
	| "ohio"
	| "pakistani"
	| "palestinian"
	| "paraguayan"
	| "persian"
	| "philly"
	| "polish"
	| "polynesian"
	| "portuguese"
	| "romanian"
	| "russian"
	| "rwandan"
	| "scottish"
	| "serbian"
	| "singaporean"
	| "slovak"
	| "slovenian"
	| "south african"
	| "spanish"
	| "swedish"
	| "swiss"
	| "taiwan"
	| "texas"
	| "thai"
	| "turkish"
	| "ugandan"
	| "uk"
	| "ukranian"
	| "vancouver"
	| "venezuelan"
	| "vietnamese"
	| "welsh"
	| "zambian";

type Style =
	| "sad"
	| "progressive"
	| "neo"
	| "modern"
	| "minimal"
	| "ambient"
	| "acoustic"
	| "chill"
	| "instrumental"
	| "melodic"
	| "indie"
	| "alternative"
	| "anime"
	| "baroque"
	| "bass"
	| "black"
	| "deep"
	| "glitch"
	| "experimental"
	| "medieval";

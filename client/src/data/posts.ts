import HomeNetworkImg1 from '../assets/HomeNetworkDiagram.png';
import HomeNetworkImg2 from '../assets/HomeNetworkDiagram2.png';
import HomeNetworkImg3 from '../assets/HomeNetworkDiagram3.png';
import HomeNetworkImg4 from '../assets/HomeNetworkDiagram4.png';

export type ContentBlock =
  | { type: 'text'; text: string }
  | { type: 'image'; src: string; alt?: string };

export type Post = {
  id: string;
  title: string;
  date: string;
  tags?: string[];
  content: ContentBlock[];
};

const posts: Post[] = [
  {
    id: 'welcome-post',
    title: 'Self-hosting safely using Cloudflare Tunnels',
    date: '2025-10-01',
    tags: ['personal', 'self-hosting'],
    content: [
      { type: 'text', text: 'When I first had the idea to self-host my own website, my biggest concern was security. ' +
        'For a server to be public, it needs to be able to receive and send messages from anywhere. Typically, this means ' +
        'registering your domain to the IP address your server is running at, and having your server listen for incoming connections ' +
        'from clients. When a connection is received, the server reads the request (e.g., "I would like to see foo.com/example") ' +
        'and returns the appropriate response ("Here’s that page!" or maybe "404 – I don’t have that page!").' },

      { type: 'text', text: '### Security Risks' },
      { type: 'text', text: 'The problem is that when you expose your machine directly to the internet, anyone can try to initiate a connection, not just legitimate users. ' +
        'In fact, there are automated bots [constantly scanning IP addresses](https://www.akamai.com/blog/security-research/vulnerability-scanning-ipv6-why-should-we-care), probing for open ports that they can attempt to brute force. ' +
        'Fortunately, most residential setups are connected through a router or switch that serves as the gateway to the wider internet. ' +
        'By default, it only allows outgoing connections and silently drops unsolicited incoming packets, preventing attackers from even reaching your machine.' },

      { type: 'text', text: '### A Simple Solution' },
      { type: 'text', text: 'There are ways to override this behavior (like port forwarding), but even beyond that, many ISPs block packets addressed to ports commonly used for hosting. ' +
        'And even if you manage to work around that, your server would still be vulnerable to denial-of-service (DoS) attacks and other forms of abuse. ' +
        'A much simpler and safer solution that I use for my site is [Cloudflare Tunneling](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/). ' +
        'Cloudflare Tunnels work through the cloudflared daemon, which, when started, establishes a secure outbound connection linking your local service port to the Cloudflare network.' },

      { type: 'image', src: HomeNetworkImg1, alt: 'Establishing a secure outbound connection to Cloudflare servers' },

      { type: 'text', text: 'When you register your domain, rather than pointing it to your personal IP address, you point it to Cloudflare’s IPs. ' +
        'When a visitor enters your domain, [DNS resolution](https://www.freecodecamp.org/news/how-dns-works-the-internets-address-book/) sends their request to Cloudflare’s edge servers.'},

      { type: 'image', src: HomeNetworkImg2, alt: 'User requests are routed to Cloudflare servers and safely relayed to your home server' },

      { type: 'text', text: 'Once the Cloudflare servers recieve the request, they can do one of two things. To be more efficient, Cloudflare may save copies of your data (webpgage, image, etc) '+
        'in its cache. If it has cached copy of the item the user requested, it can simply return it and your home server never even has to do anything. Otherwise if no cached copy is ' +
        'availale, it will send a duplicate of the user\'s request to your server via the previously established connection via cloudflared.'},
      { type: 'image', src: HomeNetworkImg3, alt: 'Cloudflare servers return their cached copy, or request the data from the self-hosted server' },

      { type: 'text', text: 'Once Cloudflare\'s request hits the self-hosted server, it handles the request and sends the response back up the cloudflared' +
        'connection. At this point Cloudflared can fufil the user\'s request as if it was the server itself.'
      },
      { type: 'image', src: HomeNetworkImg4, alt: 'Cloudflare servers return their cached copy, or request the data from the self-hosted server' },
    ]
  },
];

export default posts;

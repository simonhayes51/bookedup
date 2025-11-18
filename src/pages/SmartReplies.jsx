import { useState } from 'react';
import { Sparkles, Copy, Check, Send, MessageSquare, Zap, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui';

const SmartReplies = () => {
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [generatedReplies, setGeneratedReplies] = useState([]);
  const [customizing, setCustomizing] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const enquiries = [
    {
      id: 1,
      client: 'Sarah Johnson',
      event: 'Wedding Reception',
      date: 'June 15, 2026',
      budget: '£500-700',
      message: "Hi! We're getting married in June and love your music style. We need a DJ for our reception from 7pm-midnight. Our budget is around £600. Are you available?",
      context: {
        guestCount: 120,
        venue: 'The Grand Hotel',
        vibe: 'elegant and romantic'
      }
    },
    {
      id: 2,
      client: 'TechCorp Events',
      event: 'Corporate Christmas Party',
      date: 'December 18, 2025',
      budget: '£800-1000',
      message: "Hello, we're planning our annual Christmas party for about 200 employees. Looking for a DJ who can handle both background music during dinner and upbeat party music after. What's your pricing for a 6-hour event?",
      context: {
        guestCount: 200,
        venue: 'City Conference Centre',
        vibe: 'professional but fun'
      }
    },
    {
      id: 3,
      client: 'Mike Thompson',
      event: '40th Birthday Bash',
      date: 'March 22, 2026',
      budget: '£400-500',
      message: "Hey! Throwing a big 40th birthday party and need someone to keep the energy up. It's gonna be at my place, about 50 people, mostly playing 90s/00s hits. You free March 22nd?",
      context: {
        guestCount: 50,
        venue: 'Private residence',
        vibe: 'high energy, nostalgic'
      }
    }
  ];

  const templates = [
    {
      name: 'Professional & Detailed',
      tone: 'professional',
      style: 'Formal, comprehensive, builds trust',
      example: 'Uses proper structure, detailed info, professional language'
    },
    {
      name: 'Friendly & Conversational',
      tone: 'friendly',
      style: 'Warm, approachable, personable',
      example: 'Casual language, enthusiastic, builds rapport'
    },
    {
      name: 'Quick & Concise',
      tone: 'brief',
      style: 'Short, to the point, efficient',
      example: 'Bullet points, key info only, fast to read'
    }
  ];

  const generateReplies = (enquiry, tone) => {
    const replies = {
      professional: `Hi ${enquiry.client.split(' ')[0]},

Thank you so much for reaching out about your ${enquiry.event.toLowerCase()}! I'd be absolutely delighted to help make your special day unforgettable.

I'm pleased to confirm that I'm available on ${enquiry.date}. Based on your requirements, here's what I can offer:

📅 Date: ${enquiry.date}
⏰ Duration: 5 hours (7pm-midnight)
👥 Guest Count: ${enquiry.context.guestCount} guests
🎵 Music Style: Tailored to your ${enquiry.context.vibe} vibe
💰 Investment: £${enquiry.budget.split('-')[0].replace('£', '')} - ${enquiry.budget.split('-')[1]}

**What's Included:**
✓ Professional DJ setup with premium sound system
✓ Extensive music library across all genres
✓ Wireless microphone for speeches/announcements
✓ Elegant uplighting to match your venue
✓ Pre-event consultation to plan the perfect playlist
✓ Professional attire and punctual setup

I'd love to schedule a quick call to discuss your musical preferences and any special requests you might have. I also have some great ideas for creating magical moments during your first dance and other key parts of the evening.

Would you be available for a brief chat this week? I typically respond within 2 hours and pride myself on making the booking process completely stress-free.

Looking forward to helping create an amazing atmosphere for your celebration!

Best regards,
[Your Name]`,

      friendly: `Hey ${enquiry.client.split(' ')[0]}! 🎉

Congratulations on your ${enquiry.event.toLowerCase()}! I'm SO excited you reached out - ${enquiry.date} is definitely free and I'd love to be part of your special day!

Your budget of ${enquiry.budget} works perfectly for what you're looking for. Here's the vibe I'm thinking:

🎵 **The Setup:**
- Premium sound that'll fill the room without being overwhelming
- Lighting that'll make ${enquiry.context.venue} look absolutely stunning
- Wireless mic for speeches (always a crowd favorite!)
- Music that perfectly matches your ${enquiry.context.vibe} style

🎊 **What Makes It Special:**
I'll work with you to craft the perfect playlist - from the ceremony to the last dance. No cheesy requests unless YOU want them! 😄

The best part? I'm super flexible and easy to work with. We can jump on a quick call whenever works for you to chat about song ideas, special moments, and anything else you're envisioning.

My couples always tell me they loved how stress-free the whole process was. I'll handle all the music details so you can just enjoy your night!

Want to grab a coffee and chat? Or happy to do a quick video call if that's easier!

Can't wait to hear more about your plans!

Cheers,
[Your Name] 🎧`,

      brief: `Hi ${enquiry.client.split(' ')[0]},

Yes, I'm available ${enquiry.date}! Your budget works great.

**Package includes:**
• 5 hours (7pm-midnight)
• Professional DJ setup + sound system
• Uplighting & wireless microphone
• Custom playlist planning
• ${enquiry.context.guestCount} guests - perfect size!

**Price: £${enquiry.budget.split('-')[1].replace('£', '')}**

Free to chat this week? I'll send over:
✓ Full equipment list
✓ Song preference form
✓ Timeline planning sheet
✓ Contract & invoice

Let me know what time works!

Best,
[Your Name]`
    };

    return [
      { tone: 'Professional & Detailed', content: replies.professional, convertRate: 87 },
      { tone: 'Friendly & Conversational', content: replies.friendly, convertRate: 92 },
      { tone: 'Quick & Concise', content: replies.brief, convertRate: 78 }
    ];
  };

  const handleGenerateReplies = (enquiry) => {
    setSelectedEnquiry(enquiry);
    const replies = generateReplies(enquiry, 'all');
    setGeneratedReplies(replies);
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const stats = {
    avgResponseTime: '1.2 hours',
    conversionRate: 89,
    repliesSent: 347,
    timeSaved: '28 hours'
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-10 h-10 text-purple-400" />
            <h1 className="text-4xl font-bold text-gray-900">AI Smart Replies</h1>
          </div>
          <p className="text-gray-600">Respond faster, book more - powered by AI</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-600 text-sm mb-1">Avg Response Time</div>
                <div className="text-3xl font-bold text-purple-600">{stats.avgResponseTime}</div>
              </div>
              <Zap className="w-10 h-10 text-purple-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-600 text-sm mb-1">Conversion Rate</div>
                <div className="text-3xl font-bold text-green-600">{stats.conversionRate}%</div>
              </div>
              <TrendingUp className="w-10 h-10 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-600 text-sm mb-1">Replies Sent</div>
                <div className="text-3xl font-bold text-blue-600">{stats.repliesSent}</div>
              </div>
              <MessageSquare className="w-10 h-10 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-600 text-sm mb-1">Time Saved</div>
                <div className="text-3xl font-bold text-yellow-600">{stats.timeSaved}</div>
              </div>
              <Sparkles className="w-10 h-10 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Enquiries List */}
          <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Enquiries</h2>
            <div className="space-y-4">
              {enquiries.map((enquiry) => (
                <div
                  key={enquiry.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedEnquiry?.id === enquiry.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                  }`}
                  onClick={() => handleGenerateReplies(enquiry)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-semibold text-gray-900">{enquiry.client}</div>
                      <div className="text-sm text-gray-600">{enquiry.event}</div>
                    </div>
                    <Button size="sm" variant="primary">
                      <Sparkles className="w-4 h-4 mr-1" />
                      Generate
                    </Button>
                  </div>
                  <div className="text-sm text-gray-700 mb-2 line-clamp-2">{enquiry.message}</div>
                  <div className="flex gap-4 text-xs text-gray-500">
                    <span>📅 {enquiry.date}</span>
                    <span>💰 {enquiry.budget}</span>
                    <span>👥 {enquiry.context.guestCount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Generated Replies */}
          <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">AI-Generated Replies</h2>

            {!selectedEnquiry ? (
              <div className="text-center py-12 text-gray-500">
                <Sparkles className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                <p className="text-lg font-semibold mb-2">Select an enquiry to generate replies</p>
                <p className="text-sm">Our AI will create 3 personalized response options</p>
              </div>
            ) : (
              <div className="space-y-6">
                {generatedReplies.map((reply, index) => (
                  <div key={index} className="border-2 border-gray-200 rounded-lg overflow-hidden hover:border-purple-300 transition-colors">
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 px-4 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">{reply.tone}</span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                          {reply.convertRate}% conversion
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => copyToClipboard(reply.content, index)}
                          className="p-2 hover:bg-white/50 rounded transition-colors"
                        >
                          {copiedIndex === index ? (
                            <Check className="w-5 h-5 text-green-600" />
                          ) : (
                            <Copy className="w-5 h-5 text-gray-600" />
                          )}
                        </button>
                        <button className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors text-sm font-semibold">
                          <Send className="w-4 h-4 inline mr-1" />
                          Send
                        </button>
                      </div>
                    </div>
                    <div className="p-4 bg-white max-h-96 overflow-y-auto">
                      <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700 leading-relaxed">
                        {reply.content}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Tips */}
        <div className="mt-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-6 text-white">
          <h3 className="text-xl font-bold mb-4">💡 Response Tips for Higher Conversions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <strong>⚡ Respond within 2 hours:</strong> Enquiries that get fast responses are 3x more likely to book
            </div>
            <div>
              <strong>🎯 Personalize every reply:</strong> Mention their specific event type and requirements
            </div>
            <div>
              <strong>💪 Show confidence:</strong> Use "I'd love to" instead of "I could possibly"
            </div>
            <div>
              <strong>📊 Include specifics:</strong> Exact pricing, what's included, timeline
            </div>
            <div>
              <strong>🤝 Make it easy:</strong> Offer to call/meet, provide next steps clearly
            </div>
            <div>
              <strong>✨ End with enthusiasm:</strong> Show genuine excitement about their event
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartReplies;

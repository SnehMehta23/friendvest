# FriendVest - Project Requirements Document

## Executive Summary

FriendVest is an investment social platform that combines portfolio tracking, social features, and gamification to create a "high-value social club" for active investors. The platform focuses on quality content creation, performance-based leaderboards, and community-driven investment insights.

## Product Vision

Create an exclusive, invite-only investment community that attracts quality content creators and active investors through performance tracking, social features, and curated content - positioning itself as the "Amex Platinum" of investment social platforms.

## Core Value Proposition

- **For Investors**: Access to quality research, performance tracking, and community insights from skilled creators
- **For Content Creators**: Monetization opportunities through subscriptions and performance-based rewards
- **For the Platform**: High-quality, engaged user base with multiple revenue streams

## Target Audience

### Primary Users
- Active retail investors seeking quality research and community
- Investment content creators looking for monetization opportunities
- CFAs/CFPs wanting to publish and monetize their expertise

### User Personas
- **The Active Investor**: Seeks quality research and community validation
- **The Content Creator**: Skilled analyst wanting to monetize expertise
- **The Casual Follower**: Interested in following top performers and learning

## Core Features

### 1. Portfolio Management & Tracking
- **Real-time Portfolio Tracking**: Live quotes and accurate performance metrics
- **Purchase History**: Detailed transaction history with individual gain/loss tracking
- **Performance Metrics**: 
  - Total Return, YTD, Quarterly, TTM returns
  - Risk-adjusted returns
  - Diversification analysis (pie charts)
  - Monte Carlo simulations
- **LIFO/FIFO Support**: Accurate share accounting for partial sales
- **Brokerage Integration**: Plaid connection for automatic portfolio sync

### 2. Social Features & Feed
- **Home Feed**: Curated posts from followed creators and trending content
- **Post Types**:
  - Investment thesis posts (research-heavy)
  - Technical analysis with charts
  - New position notifications
  - Sell position notifications
  - Market insights and predictions
- **Content Quality Control**: AI-powered content moderation to filter low-quality posts
- **Sentiment Indicators**: Bull/bear emojis and sentiment tracking

### 3. Leaderboards & Competition
- **Multiple Timeframes**: Daily, weekly, monthly, quarterly, yearly leaderboards
- **Performance Tracking**: Accurate portfolio performance with verified returns
- **Global vs Friends**: Filter leaderboards by all users or friend networks
- **Top Gainers Feed**: Highlight followers of users with top-performing positions
- **Annual Rewards**: Profit-sharing for top annual performers

### 4. Gamification System
- **Alpha Points**: Reddit karma-style point system for quality contributions
- **Badges System**: Achievement badges for various milestones
  - Top gainers badges
  - Best idea badges
  - Prediction accuracy badges
  - Engagement badges (100+ likes, etc.)
- **Reputation System**: Alpha points contribute to user reputation
- **Donations/Tips**: Users can donate Alpha points to reward good content

### 5. Content Creator Tools
- **Formatted Posts**: Structured post templates for research and analysis
- **Subscription Model**: Users can subscribe to favorite creators
- **Revenue Sharing**: Creators keep 80% of subscription revenue
- **Analyst Picks**: Top creators can provide formal analyst recommendations
- **Performance Tracking**: Track prediction accuracy and target hit rates

### 6. User Onboarding & Community Management
- **Invite-Only System**: Exclusive access through invitations
- **Waitlist Management**: Monthly/quarterly approval batches
- **Limited Memberships**: Artificial scarcity (e.g., "100 memberships available")
- **Referral System**: Free month for successful referrals
- **Beta Testing**: Initial rollout to friends and select testers

## Technical Architecture

### Authentication
- **Primary**: Google OAuth integration
- **Future**: Email/password authentication
- **Platform**: Google Console project already created

### Data Infrastructure
- **Database**: Supabase for data storage
- **APIs**: TwelveData Stock Market API (or alternative)
- **Hosting**: Netlify
- **Analytics**: Google Analytics integration
- **Brokerage Data**: Plaid API for portfolio connections

### Mobile & Web
- **Initial**: Web application
- **Future**: Mobile app development

## Monetization Strategy

### Revenue Streams
1. **Subscription Tiers**:
   - Basic: $60/year ($5/month)
   - Premium: Additional creator subscriptions
   - Professional: Enhanced features for CFAs/CFPs

2. **Creator Economy**:
   - Platform takes 20% of creator subscription revenue
   - Incentivizes quality content creation

3. **Future Revenue**:
   - Affiliate marketing
   - Advertising (mutual funds, ETFs, brokers)
   - Premium research subscriptions

### Pricing Strategy
- **Freemium Model**: Ad-supported free tier with limited features
- **Premium Tiers**: $5/month base + creator subscriptions
- **Professional**: Higher tier for licensed professionals

## User Experience & Design

### Brand Identity
- **Aesthetic**: Exclusive, high-end social club feel
- **References**: "Amex Platinum membership," "Macao casino," "most interesting man in the world"
- **Positioning**: Insider knowledge and exclusive access

### Key Pages
1. **Landing Page**: Leaderboards, top performers, value proposition
2. **Home Feed**: Curated content stream
3. **Profile Pages**: Portfolio, performance, badges, subscription options
4. **Leaderboard Pages**: Multiple timeframes and filters
5. **Market Overview**: Real-time market data and insights

### Privacy Controls
- **Portfolio Visibility**: Private vs public settings (SoFi-style)
- **Performance Sharing**: Granular control over what metrics to share

## Content Strategy

### Quality Control
- **AI Moderation**: Automated content filtering for quality
- **Thesis Requirement**: Posts must provide substantive investment thesis
- **Report Format**: Research-heavy content that provides real value
- **Professional Standards**: Attract and reward quality creators

### Content Types
- **Research Reports**: In-depth analysis and recommendations
- **Technical Analysis**: Chart analysis and trading ideas
- **Market Commentary**: Daily insights and predictions
- **Educational Content**: Financial literacy and investment strategies
- **Performance Updates**: Position changes and rationale

## Competitive Analysis

### Direct Competitors
- **StockTwits**: More social, less focused on performance
- **Seeking Alpha**: Traditional media model, less community-driven
- **Motley Fool**: Subscription-based, but not social

### Competitive Advantages
- **Performance-Based**: Verified portfolio tracking
- **Quality Focus**: Curated content and creator economy
- **Gamification**: Engaging reward system
- **Exclusivity**: Invite-only community building

## Development Roadmap

### Phase 1: MVP (Months 1-3)
- Google OAuth integration
- Basic portfolio tracking
- Simple social feed
- Leaderboard functionality
- User profiles

### Phase 2: Social Features (Months 4-6)
- Creator subscriptions
- Alpha points system
- Badge system
- Content moderation
- Advanced portfolio analytics

### Phase 3: Monetization (Months 7-9)
- Payment processing
- Revenue sharing
- Professional tier
- Advanced analytics
- Mobile optimization

### Phase 4: Scale (Months 10-12)
- API integrations
- Advanced gamification
- Affiliate program
- Professional tools
- Community growth features

## Success Metrics

### User Engagement
- Daily/Monthly Active Users
- Average session duration
- Content creation rate
- Subscription conversion rate

### Content Quality
- Post engagement rates
- Creator retention
- Subscription renewal rates
- Alpha point distribution

### Financial Performance
- Monthly Recurring Revenue (MRR)
- Creator revenue sharing
- User acquisition cost
- Lifetime value

### Community Health
- Invite acceptance rate
- User retention rate
- Quality score (AI moderation)
- Professional user percentage

## Risk Mitigation

### Technical Risks
- **API Reliability**: Multiple data source options
- **Scalability**: Cloud-native architecture
- **Security**: Secure authentication and data handling

### Business Risks
- **Regulatory**: Compliance with financial regulations
- **Competition**: Strong differentiation strategy
- **User Acquisition**: Referral and invite system

### Operational Risks
- **Content Moderation**: AI + human oversight
- **Creator Relations**: Fair revenue sharing
- **Quality Control**: Continuous monitoring and improvement

## Future Opportunities

### Expansion Features
- **Crypto Integration**: Cryptocurrency portfolio tracking
- **Educational Platform**: Structured learning paths
- **Institutional Features**: Tools for professional investors
- **International Markets**: Global stock market support

### Partnership Opportunities
- **Brokerage Partnerships**: Enhanced integrations
- **Educational Institutions**: CFA/CFP program partnerships
- **Financial Media**: Content syndication opportunities

## Conclusion

FriendVest represents a unique opportunity to create a premium investment social platform that combines the best aspects of social media, portfolio tracking, and content creation. By focusing on quality over quantity and building an exclusive community, the platform can differentiate itself in the crowded fintech space while creating sustainable revenue streams for both the platform and its creators.
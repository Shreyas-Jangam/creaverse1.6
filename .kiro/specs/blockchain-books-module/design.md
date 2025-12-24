# Design Document

## Overview

The Blockchain Books Module implements a decentralized publishing platform where authors tokenize chapters as NFTs, readers stake CDT tokens for access, and quality reviewers earn rewards. The system uses Ethereum/Polygon smart contracts for transparency and Supabase for performance optimization.

## Architecture

### System Architecture
```
Frontend (React/TypeScript)
├── Web3 Integration Layer
│   ├── Wallet Connectivity (MetaMask/WalletConnect)
│   ├── Smart Contract Interface
│   └── Transaction Management
├── Books Module Components
│   ├── Author Dashboard
│   ├── Reader Library
│   ├── Chapter Viewer
│   └── Review System
└── Backend Integration
    ├── Supabase Database
    ├── Content Storage (Encrypted)
    └── Caching Layer

Smart Contracts (Solidity)
├── ChapterNFT Contract
├── StakingManager Contract
├── ReviewRewards Contract
└── TokenEconomics Contract

Blockchain Network
├── Polygon (Primary - Low Gas)
├── Ethereum (Fallback)
└── CDT Token (ERC-20)
```

### Data Flow
1. **Author Flow**: Upload → Encrypt → Mint NFT → Set Economics → Deploy
2. **Reader Flow**: Browse → Preview → Stake → Unlock → Access → Review
3. **Reward Flow**: Review → Quality Analysis → Reward Calculation → Distribution

## Components and Interfaces

### Smart Contracts

#### ChapterNFT Contract
```solidity
contract ChapterNFT is ERC721 {
    struct Chapter {
        uint256 tokenId;
        address author;
        string contentHash;
        uint256 unlockPrice;
        uint256 royaltyPercent;
        uint256 reviewRewardPool;
        bool isActive;
    }
    
    mapping(uint256 => Chapter) public chapters;
    mapping(address => uint256[]) public authorChapters;
    mapping(uint256 => mapping(address => bool)) public hasAccess;
    
    function mintChapter(
        string memory contentHash,
        uint256 unlockPrice,
        uint256 royaltyPercent,
        uint256 reviewRewardPool
    ) external returns (uint256);
    
    function grantAccess(uint256 tokenId, address reader) external;
    function hasChapterAccess(uint256 tokenId, address reader) external view returns (bool);
}
```

#### StakingManager Contract
```solidity
contract StakingManager {
    struct Stake {
        address staker;
        uint256 amount;
        uint256 chapterTokenId;
        uint256 timestamp;
        bool isActive;
    }
    
    mapping(address => Stake[]) public userStakes;
    mapping(uint256 => uint256) public totalStaked;
    
    function stakeForChapter(uint256 chapterTokenId, uint256 amount) external;
    function unstake(uint256 stakeIndex) external;
    function distributeEarnings(uint256 chapterTokenId) external;
}
```

#### ReviewRewards Contract
```solidity
contract ReviewRewards {
    struct Review {
        address reviewer;
        uint256 chapterTokenId;
        string contentHash;
        uint256 qualityScore;
        uint256 likes;
        uint256 timestamp;
        bool rewardClaimed;
    }
    
    mapping(uint256 => Review[]) public chapterReviews;
    mapping(address => uint256) public reviewerEarnings;
    
    function submitReview(
        uint256 chapterTokenId,
        string memory contentHash
    ) external;
    
    function calculateRewards(uint256 chapterTokenId) external;
    function claimRewards() external;
}
```

### Frontend Components

#### Web3 Integration Hook
```typescript
interface Web3State {
  account: string | null;
  chainId: number | null;
  isConnected: boolean;
  balance: string;
  cdtBalance: string;
}

interface Web3Actions {
  connect: () => Promise<void>;
  disconnect: () => void;
  switchNetwork: (chainId: number) => Promise<void>;
  stakeTokens: (chapterTokenId: number, amount: string) => Promise<string>;
  mintChapter: (metadata: ChapterMetadata) => Promise<string>;
}

export const useWeb3 = (): [Web3State, Web3Actions];
```

#### Chapter Management Interface
```typescript
interface Chapter {
  tokenId: number;
  title: string;
  author: string;
  authorAddress: string;
  description: string;
  unlockPrice: string;
  royaltyPercent: number;
  reviewRewardPool: string;
  totalStaked: string;
  readersCount: number;
  averageRating: number;
  isUnlocked: boolean;
  contentHash: string;
  createdAt: Date;
}

interface ChapterAccess {
  hasAccess: boolean;
  unlockedAt?: Date;
  stakeAmount?: string;
  transactionHash?: string;
}
```

## Data Models

### Database Schema (Supabase)

#### Books Table
```sql
CREATE TABLE books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  author_id UUID REFERENCES profiles(id),
  author_address TEXT NOT NULL,
  cover_image_url TEXT,
  genre TEXT,
  total_chapters INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Chapters Table
```sql
CREATE TABLE chapters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  book_id UUID REFERENCES books(id),
  token_id BIGINT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  chapter_number INTEGER NOT NULL,
  content_hash TEXT NOT NULL,
  encrypted_content_url TEXT NOT NULL,
  unlock_price DECIMAL(18,8) NOT NULL,
  royalty_percent INTEGER NOT NULL,
  review_reward_pool DECIMAL(18,8) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Chapter Access Table
```sql
CREATE TABLE chapter_access (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id UUID REFERENCES chapters(id),
  reader_address TEXT NOT NULL,
  stake_amount DECIMAL(18,8) NOT NULL,
  transaction_hash TEXT NOT NULL,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(chapter_id, reader_address)
);
```

#### Reviews Table
```sql
CREATE TABLE chapter_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id UUID REFERENCES chapters(id),
  reviewer_address TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  quality_score DECIMAL(5,2) DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  reward_earned DECIMAL(18,8) DEFAULT 0,
  reward_claimed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Chapter Access Integrity
*For any* chapter unlock transaction, the reader should gain permanent access if and only if the correct stake amount was successfully locked in the contract
**Validates: Requirements 2.2, 2.3, 4.4**

### Property 2: Token Economics Conservation
*For any* staking transaction, the total tokens in circulation should remain constant (staked tokens + free tokens = initial supply)
**Validates: Requirements 8.1, 8.2, 4.3**

### Property 3: Author Ownership Verification
*For any* chapter tokenization, only the verified author should be able to mint the NFT and set economic parameters
**Validates: Requirements 1.1, 1.2, 4.2**

### Property 4: Review Reward Distribution Fairness
*For any* review reward distribution, the total rewards distributed should not exceed the allocated reward pool for that chapter
**Validates: Requirements 3.2, 3.3, 8.3**

### Property 5: Content Access Security
*For any* attempt to access chapter content, the system should serve decrypted content if and only if blockchain ownership is verified
**Validates: Requirements 7.2, 7.4, 2.4**

### Property 6: Anti-Spam Review Protection
*For any* review submission, a single address should not be able to submit multiple reviews for the same chapter within the spam prevention window
**Validates: Requirements 3.4, 7.3**

### Property 7: Staking State Consistency
*For any* chapter, the sum of all individual stakes should equal the total staked amount recorded in the contract
**Validates: Requirements 2.2, 4.3, 8.1**

## Error Handling

### Smart Contract Errors
- **Insufficient Balance**: Clear error when user lacks CDT tokens
- **Already Unlocked**: Prevent double-staking for same chapter
- **Invalid Chapter**: Reject operations on non-existent tokens
- **Unauthorized Access**: Block non-author operations on chapters

### Frontend Error Handling
- **Wallet Connection Failures**: Retry logic with user guidance
- **Network Switching**: Automatic network detection and switching
- **Transaction Failures**: Clear error messages with retry options
- **Content Loading**: Fallback UI for slow blockchain responses

### Security Error Handling
- **Unauthorized Content Access**: Log attempts and block IP
- **Invalid Signatures**: Reject tampered transactions
- **Replay Attacks**: Implement nonce-based protection
- **Rate Limiting**: Prevent spam and abuse

## Testing Strategy

### Smart Contract Testing
- **Unit Tests**: Test individual contract functions with edge cases
- **Integration Tests**: Test contract interactions and state changes
- **Security Tests**: Test for reentrancy, overflow, and access control
- **Gas Optimization**: Ensure efficient contract execution

### Frontend Testing
- **Component Tests**: Test UI components with mock blockchain data
- **Integration Tests**: Test Web3 integration with test networks
- **E2E Tests**: Complete user flows from wallet connection to content access
- **Performance Tests**: Test with large numbers of chapters and users

### Property-Based Testing
- **Staking Invariants**: Test that staking always preserves token conservation
- **Access Control**: Test that only authorized users can access content
- **Reward Distribution**: Test that rewards are distributed fairly and completely
- **Content Security**: Test that encrypted content remains secure

### Configuration
- Minimum 100 iterations per property test
- Each test tagged with: **Feature: blockchain-books-module, Property {number}: {property_text}**
- Use Hardhat for smart contract testing
- Use React Testing Library for frontend testing
- Use Playwright for E2E testing

## Implementation Notes

### Blockchain Network Selection
- **Primary**: Polygon (low gas fees, fast transactions)
- **Fallback**: Ethereum mainnet (maximum security)
- **Development**: Local Hardhat network and testnets

### Content Encryption Strategy
```typescript
// AES-256 encryption for chapter content
const encryptContent = (content: string, key: string): string => {
  return CryptoJS.AES.encrypt(content, key).toString();
};

// Decrypt only after blockchain verification
const decryptContent = async (
  encryptedContent: string, 
  chapterTokenId: number, 
  userAddress: string
): Promise<string> => {
  const hasAccess = await verifyBlockchainAccess(chapterTokenId, userAddress);
  if (!hasAccess) throw new Error('Unauthorized access');
  
  return CryptoJS.AES.decrypt(encryptedContent, getDecryptionKey()).toString();
};
```

### Gas Optimization
- Batch operations where possible
- Use events for off-chain indexing
- Implement efficient data structures
- Minimize storage operations

### Scalability Considerations
- Layer 2 solutions for high-volume operations
- IPFS for content storage and distribution
- Caching strategies for frequently accessed data
- Database indexing for fast queries

This design ensures a secure, scalable, and user-friendly blockchain-powered books platform that provides real value to authors, readers, and reviewers while maintaining the highest standards of security and performance.
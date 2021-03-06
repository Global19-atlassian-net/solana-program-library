declare module '@solana/spl-token' {
  import { Buffer } from 'buffer';
  import { PublicKey, TransactionInstruction, TransactionSignature, Connection, Account } from "@solana/web3.js";
  import BN from 'bn.js';

  // === client/token.js ===
  export class u64 extends BN {
    toBuffer(): Buffer;
    static fromBuffer(buffer: Buffer): u64;
  }
  export type AuthorityType =
  | 'MintTokens'
  | 'FreezeAccount'
  | 'AccountOwner'
  | 'CloseAccount';

  export const NATIVE_MINT: PublicKey;

  export type MintInfo = {
    mintAuthority: null | PublicKey,
    supply: u64,
    decimals: number,
    isInitialized: boolean,
    freezeAuthority: null | PublicKey,
  };
  export type AccountInfo = {
    mint: PublicKey,
    owner: PublicKey,
    amount: u64,
    delegate: null | PublicKey,
    delegatedAmount: u64,
    isInitialized: boolean,
    isFrozen: boolean,
    isNative: boolean,
    rentExemptReserve: null | u64,
    closeAuthority: null | PublicKey,
  };
  export type MultisigInfo = {
    m: number,
    n: number,
    initialized: boolean,
    signer1: PublicKey,
    signer2: PublicKey,
    signer3: PublicKey,
    signer4: PublicKey,
    signer5: PublicKey,
    signer6: PublicKey,
    signer7: PublicKey,
    signer8: PublicKey,
    signer9: PublicKey,
    signer10: PublicKey,
    signer11: PublicKey,
  };
  export class Token {
    constructor(
      connection: Connection,
      publicKey: PublicKey,
      programId: PublicKey,
      payer: Account,
    );
    static createMint(
      connection: Connection,
      payer: Account,
      mintAuthority: PublicKey,
      freezeAuthority: PublicKey | null,
      decimals: number,
      programId: PublicKey,
    ): Promise<Token>;
    static getAccount(connection: Connection): Promise<Account>;
    createAccount(owner: PublicKey): Promise<PublicKey>;
    static createWrappedNativeAccount(
        connection: Connection,
        programId: PublicKey,
        owner: PublicKey,
        payer: Account,
        amount: number,
    ): Promise<PublicKey>;
    createMultisig(m: number, signers: Array<PublicKey>): Promise<PublicKey>;
    getMintInfo(): Promise<MintInfo>;
    getAccountInfo(account: PublicKey): Promise<AccountInfo>;
    getMultisigInfo(multisig: PublicKey): Promise<MultisigInfo>;
    transfer(
      source: PublicKey,
      destination: PublicKey,
      owner: Account | PublicKey,
      multiSigners: Array<Account>,
      amount: number | u64,
    ): Promise<TransactionSignature>;
    approve(
      account: PublicKey,
      delegate: PublicKey,
      owner: Account | PublicKey,
      multiSigners: Array<Account>,
      amount: number | u64,
    ): Promise<void>;
    revoke(
      account: PublicKey,
      owner: Account | PublicKey,
      multiSigners: Array<Account>,
    ): Promise<void>;
    setAuthority(
      account: PublicKey,
      newAuthority: PublicKey | null,
      authorityType: AuthorityType,
      currentAuthority: Account | PublicKey,
      multiSigners: Array<Account>,
    ): Promise<void>;
    mintTo(
      dest: PublicKey,
      authority: Account | PublicKey,
      multiSigners: Array<Account>,
      amount: number,
    ): Promise<void>;
    burn(
      account: PublicKey,
      owner: Account | PublicKey,
      multiSigners: Array<Account>,
      amount: number,
    ): Promise<void>;
    closeAccount(
      account: PublicKey,
      dest: PublicKey,
      authority: Account | PublicKey,
      multiSigners: Array<Account>,
    ): Promise<void>;
    static createInitMintInstruction(
      programId: PublicKey,
      mint: PublicKey,
      decimals: number,
      mintAuthority: PublicKey,
      freezeAuthority: PublicKey | null,
    ): TransactionInstruction;
    static createInitAccountInstruction(
      programId: PublicKey,
      mint: PublicKey,
      account: PublicKey,
      owner: PublicKey,
    ): TransactionInstruction;
    static createTransferInstruction(
      programId: PublicKey,
      source: PublicKey,
      destination: PublicKey,
      owner: PublicKey,
      multiSigners: Array<Account>,
      amount: number | u64,
    ): TransactionInstruction;
    static createApproveInstruction(
      programId: PublicKey,
      account: PublicKey,
      delegate: PublicKey,
      owner: PublicKey,
      multiSigners: Array<Account>,
      amount: number | u64,
    ): TransactionInstruction;
    static createRevokeInstruction(
      programId: PublicKey,
      account: PublicKey,
      owner: PublicKey,
      multiSigners: Array<Account>,
    ): TransactionInstruction;
    static createSetAuthorityInstruction(
      programId: PublicKey,
      account: PublicKey,
      newAuthority: PublicKey | null,
      authority: PublicKey,
      multiSigners: Array<Account>,
    ): TransactionInstruction;
    static createMintToInstruction(
      programId: PublicKey,
      mint: PublicKey,
      dest: PublicKey,
      authority: PublicKey,
      multiSigners: Array<Account>,
      amount: number,
    ): TransactionInstruction;
    static createBurnInstruction(
      programId: PublicKey,
      mint: PublicKey,
      account: PublicKey,
      owner: PublicKey,
      multiSigners: Array<Account>,
      amount: number,
    ): TransactionInstruction;
    static createCloseAccountInstruction(
      programId: PublicKey,
      account: PublicKey,
      dest: PublicKey,
      authority: PublicKey,
      multiSigners: Array<Account>,
    ): TransactionInstruction;
  }
}

class User {
  constructor({ id, email, wallet, password, assets }) {
    this.id = id;
    this.email = email;
    this.wallet = wallet;
    this.password = password;
    this.assets = assets;
  }

  getInfo() {
    return {
      id: this.id,
      email: this.email,
      wallet: this.wallet,
      assets: this.assets,
    }
  }

  getHash() {
    return this.password
  }

  subtract(assetId, amount) {
    this.assets[assetId] -= amount
    return this.assets
  }
}

module.exports = User;
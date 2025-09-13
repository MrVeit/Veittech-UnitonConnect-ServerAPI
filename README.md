# UNITON CONNECT - API SERVER

[![NodeJS](https://img.shields.io/badge/NodeJS-20.1+-2296F3.svg?color=318CE7&style=flat-square&logo=NodeJs&logoColor=E0FFFF)]()
[![License](https://img.shields.io/github/license/MrVeit/Veittech-UnitonConnect-ServerAPI?color=318CE7&style=flat-square&logo=github&logoColor=E0FFFF)](LICENSE)
![Last commit](https://img.shields.io/github/last-commit/MrVeit/Veittech-UnitonConnect-ServerAPI/master?color=318CE7&style=flat-square&logo=alwaysdata&logoColor=E0FFFF)
![Last release](https://img.shields.io/github/release-date/MrVeit/Veittech-UnitonConnect-ServerAPI?color=318CE7&style=flat-square&logo=Dropbox&logoColor=E0FFFF)
![Downloads](https://img.shields.io/github/downloads/MrVeit/Veittech-UnitonConnect-ServerAPI/total?color=318CE7&style=flat-square&logo=codeigniter&logoColor=E0FFFF)

Implementation of a simple backend for [Uniton Connect library](https://github.com/MrVeit/Veittech-UnitonConnect).

As of **CURRENT VERSION** of the library, the following functionality `is available` for routes:

- [x] Load NFT pictures/token icons **without CORS** issues,
- [x] Generate payload for **sending jetton** transactions,
- [x] Generate payload for **sending NFT** items,
- [x] Read the address of **jetton wallet** on a connected wallet,
- [x] Read the balance of **specific jetton** on a connected wallet,
- [x] Read **existing NFT collections** on a connected wallet,
- [ ] Load last successful transactions history **with Toncoin**,
- [x] Load last successful transactions **with Jettons**,
- [ ] Load last successful transactions **with NFT Collections**,
- [ ] Load the current **real-time price** of toncoin/jetton,
- [ ] Burn nft **items from collections** on the connected wallet,
- [ ] Swap tokens **to toncoin and reverse** via Dedust/Stonfi platform
- [x] Verification of a signed message with payload from a wallet to identify a real connection
- [ ] Validating a connected wallet to the application via `ton_proof`

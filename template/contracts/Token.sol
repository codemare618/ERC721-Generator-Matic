//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./ERC2981.sol";

contract {{contractName}} is ERC721Enumerable, ERC2981, Ownable{
  uint public constant MAX_UNITS = {{maxUnits}};
  string public constant BASE_TOKEN_URI = "http://us-central1-gems-802cb.cloudfunctions.net/tokenData?";

  // Optional mapping for token URIs
  mapping (uint256 => string) private _tokenURISuffixes;    //&userId=[user_id]&sessionId=[sessionId]

  event Mint(address to, uint256 tokenId, string sessionId);

  constructor() ERC721("{{contractName}}", "{{tickerSymbol}}")  {

  }

  modifier saleIsOpen{
    require(totalSupply() < MAX_UNITS, "Sale end");
    _;
  }

  function mintTokens(address _to, uint _count, string memory _sessionId) public payable saleIsOpen onlyOwner {
    require(totalSupply() + _count <= MAX_UNITS, "Max limit");
    require(totalSupply() < MAX_UNITS, "Sale end");
    for(uint i = 0; i < _count; i++){
      uint256 newTokenId = totalSupply();
      _safeMint(_to, newTokenId);
      // Set token suffix after mint
      string memory tokenURISuffix = string(abi.encodePacked("&userId=", Strings.toHexString(uint256(uint160(_to))), "&sessionId=", _sessionId));
      _setTokenURISuffix(newTokenId, tokenURISuffix);

      // Emit mint event
      emit Mint(_to, newTokenId, _sessionId);
    }
  }

  /**
   * Supports ERC165, Rarible Secondary Sale Interface, and ERC721
   */
  function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721Enumerable, ERC2981) returns (bool) {
    return super.supportsInterface(interfaceId);
  }

  /**
   * ERC2981 Royalties Standards (Mintable)
   */
  function royaltyInfo(uint256 _tokenId, uint256 _value, bytes calldata _data) external view override returns (address _receiver, uint256 _royaltyAmount, bytes memory _royaltyPaymentData) {
    return (owner(), _value / {{royaltyPercentage}}, _data);
  }

  /**
     * @dev See {IERC721Metadata-tokenURI}.
     */
  function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
    require(_exists(tokenId), "ERC721URIStorage: URI query for nonexistent token");

    string memory _tokenURISuffix = _tokenURISuffixes[tokenId];

    if (bytes(_tokenURISuffix).length > 0) {
      return string(abi.encodePacked(BASE_TOKEN_URI, "id=", Strings.toString(tokenId), _tokenURISuffix));
    }

    return BASE_TOKEN_URI;
  }

  /**
   * @dev Sets `_tokenURI` as the tokenURI of `tokenId`.
   *
   * Requirements:
   *
   * - `tokenId` must exist.
   */
  function _setTokenURISuffix(uint256 tokenId, string memory _tokenURISuffix) internal virtual {
    require(_exists(tokenId), "ERC721URIStorage: URI set of nonexistent token");
    _tokenURISuffixes[tokenId] = _tokenURISuffix;
  }

  /**
   * @dev Destroys `tokenId`.
   * The approval is cleared when the token is burned.
   *
   * Requirements:
   *
   * - `tokenId` must exist.
   *
   * Emits a {Transfer} event.
   */
  function _burn(uint256 tokenId) internal virtual override {
    super._burn(tokenId);

    if (bytes(_tokenURISuffixes[tokenId]).length != 0) {
      delete _tokenURISuffixes[tokenId];
    }
  }

  function withdrawAll() public payable onlyOwner {
    require(payable(_msgSender()).send(address(this).balance));
  }
}

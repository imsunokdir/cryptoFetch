# Crypto Market Data Project

A web application that fetches and displays cryptocurrency market data using an external API. Users can view the current market status, search for specific cryptocurrencies, and sort the data based on market cap and percentage change.

## Features
- Fetches data from the CoinGecko API to retrieve the top 10 cryptocurrencies.
- Displays the data in a neatly formatted table.
- Implements both `.then` and `async/await` methods for promise handling.
- Provides a search functionality to filter cryptocurrencies based on user input.
- Includes sort buttons to arrange the data by market cap and percentage change.

## Functionality
1. **Fetching Data**:
   - Uses the CoinGecko API endpoint: 
     ```
     https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false
     ```
   - Retrieves an array of objects containing the following properties: 
     - `name`
     - `id`
     - `image`
     - `symbol`
     - `current_price`
     - `total_volume`

2. **Rendering Data**:
   - Displays the fetched data in an HTML table with appropriate headers.
   - Dynamically populates the table rows with the data from the API response.

3. **Search Functionality**:
   - Allows users to input search terms to filter the displayed data in real time.

4. **Sorting Functionality**:
   - Provides buttons to sort the displayed data based on:
     - Market Cap
     - Percentage Change

## Marking Scheme
- **Fetch Data from API using .then and async/await**
- **API Endpoint and Parameters**
- **Data Structure and Properties**
- **Rendering Data in a Table**
- **Handling Promises**
- **Search Functionality**
- **Sort Buttons for Market Cap and Percentage Change**
- **Deployment**



## Demo
You can view the live demo of the project here: [Live Demo Link](https://crypto-fetch-git-main-imsunokdirs-projects.vercel.app/)


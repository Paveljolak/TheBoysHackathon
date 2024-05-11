import requests
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

def get_historical_price(symbol, days):
    url = f"https://api.coingecko.com/api/v3/coins/{symbol}/market_chart"
    params = {
        'vs_currency': 'eur',
        'days': days
    }
    response = requests.get(url, params=params)
    data = response.json()
    df_prices = pd.DataFrame(data['prices'], columns=['time', 'price'])
    df_prices['time'] = pd.to_datetime(df_prices['time'], unit='ms')
    return df_prices

def rw_top(data: np.array, curr_index: int, order: int) -> bool:
    if curr_index < order * 2 + 1:
        return False

    top = True
    k = curr_index - order
    v = data[k]
    for i in range(1, order + 1):
        if data[k + i] > v or data[k - i] > v:
            top = False
            break
    
    return top

def rw_bottom(data: np.array, curr_index: int, order: int) -> bool:
    if curr_index < order * 2 + 1:
        return False

    bottom = True
    k = curr_index - order
    v = data[k]
    for i in range(1, order + 1):
        if data[k + i] < v or data[k - i] < v:
            bottom = False
            break
    
    return bottom

def rw_extremes(data: np.array, order:int):
    tops = []
    bottoms = []
    for i in range(len(data)):
        if rw_top(data, i, order):
            top = [i, i - order, data[i - order]]
            tops.append(top)
        
        if rw_bottom(data, i, order):
            bottom = [i, i - order, data[i - order]]
            bottoms.append(bottom)
    
    return tops, bottoms

if __name__ == "__main__":
    # Fetch historical price data
    df_prices = get_historical_price('ethereum', 10)
    price_data = df_prices['price'].to_numpy()

    # Find local tops and bottoms
    tops, bottoms = rw_extremes(price_data, 10)

    # Plot historical price data with tops and bottoms
    plt.plot(df_prices['time'], df_prices['price'], label='Price')
    for top in tops:
        plt.plot(df_prices['time'][top[1]], top[2], marker='o', color='green', markersize=7)
    for bottom in bottoms:
        plt.plot(df_prices['time'][bottom[1]], bottom[2], marker='o', color='red', markersize=7)

    plt.xlabel('Date')
    plt.ylabel('Price (EUR)')
    plt.title('Historical Price Data with Local Tops and Bottoms')
    plt.legend()
    plt.grid(True)
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.show()

# ai-generated-stock-chart
by import numpy as pd
for AIC - Compfest 13

Youtube video: https://www.youtube.com/watch?v=A4t8TfpoOLw

<a href="https://ibb.co/WVQGs7r"><img src="https://i.ibb.co/kmp5MzL/screenshot.png" alt="screenshot" border="0"></a>

https://ai-generated-stock-chart.herokuapp.com/

## WHEN IT IS LOADING FOR TOO LONG, DO. NOT. SPAM! pls wait. Reload if only the chart is not generating and or the app crashes.
The loading time may be long as it is generating a new chart on every reload. If the web app crashed, please wait for a while and reload the page because it may be due to server overloads.
If some of the text overflows, please zoom out. If the chart is not generating, please reload.

<sup><sub> pls dont judge my code, i did it in a rush + i've only started learning webprog d-5 of the deadline of elimination round for AIC - Compfest 13 </sub></sup>

---

## Motivational Problem

Stock Trading has been established for some time, and people worldwide are participating in supporting the industry through investment and the revenue gain from trading. However, it is intimidating for beginners to start trading. There has been a lot of classes, both online and offline, that teach people to become a better trader. Stock Trading Simulator is a key to learning how to trade because people tend to be afraid of losing money if they are trading with actual money.

Typically, three data can be used in such a simulator: pre-existing data from the past, computer-generated data, and real-time data using virtual currency. Each approach has its own advantages and disadvantages. For instance, using pre-existing data might lead to some bias because the event already happened. Meanwhile, using virtual currency on real-time data might produce some kind of regret, such as regretting not using real money because of high gain in the simulation.

The final option is our approach, which is computer-generated data. However, if the data is too random, it does not represent the actual case. Even if we use some pre-assumption, i.e. assuming normal distribution on the price movement, that does not necessarily replicate the real-life situation. The only way to generate data close to the actual data is to use Artificial Intelligence (AI), specifically Machine Learning (ML). ML will learn how the price moves by teaching the ML model with real-life historical data, and our model uses that information to generate brand new data that is trying to replicate the actual data.

AI in trading is commonly known for predicting/forecasting prices. We believe that AI and ML can be extended beyond it, and this project is the beginning of a new era for the stock trading simulator.

---

## Current version

This website is a Stock Trading Simulator with AI-Generated stock charts. This website is built for educational purposes to increase traders' experience using newly generated data that mimics real stock data. It is a one-page website with a simple and intuitive design, easy to use by both beginners and experienced traders. No login is required; users can open this website in their preferred browser and start practising.

In this demo version, there exist 1000 different starting seeds, where each seed consists of 30 days of historical data. Users can simulate stock trading as a practice using the given virtual currency. In the beginning, the user receives Rp1,000,000,000.00 as their virtual currency and 15 days of generated prices for a reference point in their decision making. Then, the user can trade for 85 days from one stock with the generated data, which are generated based on the 30 days starting seeds. Note that originally I have 200,000 seeds for this version, but it requires 500MB+ of storage space. Since this is only a demo version, I decided to pick 1000 random seeds just as a showcase, and it only requires 10MB+ storage space.

The generated data is based on Indonesian stock with the recent government regulation, stating that today’s price can only be ranging between 93% to 125% of yesterday’s price. This is due to the pandemic to avoid the market from crashing. Both the historical data and the generated data are following this regulation.

#### Scalability

In the future, we want to extend the features and flexibilities of this website, such as multiple stocks where the stocks might affect each other. Other qualities of life updates such as leaderboards and statistics are possible to implement for future updates. Multiplayer mode with ELO rating is possible as gamification of this system, making the practice more fun and enjoyable. Users might choose the number of stocks, historical data, the starting seed, starting cash, and trading duration for flexibility.

Another extension that can be made to this website is an automatic mentoring system, where an AI, either hard-coded or not, will teach the user how to make a better decision and the reasoning behind the decision. Therefore, users gain experience in their trading, but they also expand their knowledge of being better traders.

---

## Chart Generator

#### Dataset

The data is taken from Stocknet Dataset by Yumoxu; all data is from International stocks ranging from 4 September 2012 to 1 September 2017. Unfortunately, there is no “93% to 125%” regulation in this dataset. Since the model will learn from the data without the regulation, this hard-cap of 93% to 125% is currently hard-coded. In total, 81 stock data were used, where each consists of 1253 data. Each data consists of the date of the transaction and the Open, High, Low, Close (OHLC) price of that day. The original data also contains Adjusted Close and Volume, but it is not required for our model. However, only the Open and Close prices are being used to train the ML model; meanwhile, the Low and High prices are generated using normal distribution based on the Open and Close prices. Therefore, the ML model can learn the general behaviour of the market, while the actual price, including Low and High, is simulating the random and natural behaviour of a mass of people.

Open price indicates the price at the beginning of the day, and Close price indicates the price at the end of the day. Therefore, it makes more sense to combine both Open and Close data with alternating order (Open, Close, Open, Close, ...) and generate Open and Close prices together. It will introduce the time-series property of Open and Close, rather than generating Open and Close individually.

Since my model uses a sliding window approach with a window size of 60 (30 days, alternating Open and Close), each training data consists of 30 days worth of information, which is utilized to generate the following day's pricey. In total, there are almost 200,000 sliding-window data that can be used to train the ML model. The data is split 70:30 for the training dataset and validation dataset. The validation dataset is used to evaluate how well the generator performs, preventing the model from overfitting.

The ML will generate brand new OHLC data, which then will be fed to the front-end of the web for the simulator and shown as a candlestick chart. A more detailed explanation of our model is provided in this website's “Our AI Model” section.

#### LSTM with Sliding Window

Our approach to the stock generating problem is time-series, where the list of prices is considered a sequence. Time-series problems are famously solved by Deep Recurrent Neural Network (RNN) such as Long-Short Term Memory (LSTM), the algorithm used in this model. LSTM is an algorithm proposed by Sepp Hochreiter and Jürgen Schmidhuber to improve regular RNN in a problem called Exploding/Vanishing Gradient. Sequences generated by RNN tend to converge to either 0 or infinity. LSTM is an improvement but not a solution to this problem. While RNN can generate good sequences for roughly up to 5-6 elements, LSTM can generate roughly up to 100. This is why in this version, users can only see up to 100 days in total for better experiences.

There is a better solution to the Exploding/Vanishing Gradient problem, such as LSTM with the Encoder-Decoder approach or the state-of-the-art Transformer model with Attention Mechanism. However, our concern is the computing time. It took a couple of seconds for our server (without GPU-computing) to generate the sequence of 100 elements with just LSTM. Using the deeper model to generate longer sequences might take a couple of minutes to generate a chart. Since this is only a demo version, we stick to a simple LSTM with the Sliding-Window approach. Using Transformer for this website is still our consideration for the future of this website.

In the Sliding-Window approach, a given window is used to generate the next window. Then, the next window can be used to generate the next window again, which makes it has that ‘sliding’ movement. In the current version of this website, the window size is 30, which is the historical data as the seed. Starting from the given seed, the model generates a sequence of length 100 before hitting the Exploding/Vanishing Gradient. This sequence is what the candlestick chart shows in the simulator.

#### Generation Algorithm

The goal of the model is to generate OHLC data. All four of OHLC are related to each other and the historical OHLC data, which makes generating a good-looking and convincing OHLC a lot harder. The easier solution to generating OHLC is to generate these 4 values separately. Still, the result is unrealistic, such as too random and chaotic, the huge gap between Open to Close, some values are lower than the Low and higher than the High, and no correlation or whatsoever between these 4 values.

My solution has solved these problems, and the model is capable of producing convincing charts. First, the algorithm will generate the Open and Close together. Since Open is the price at the beginning of a day, and Close is the price at the end of a day, Open and Close should be time-series data that affect each other. I combine the Open and Close dataset with the Open and Close alternate each other. For example, the sequence in my dataset will be Open day 1, Close day 1, Open day 2, Close day 2, Open day 3, Close day 3, etc. Then, after the generation is complete, the odd and even index can be separated. The even index is for Open, and the odd index is for Close (assuming zero-based indexing).

Furthermore, we hard-coded such a rule to the generation algorithm to give the restriction of “93% to 125% of the previous day’s price”. If the model decided to generate numbers outside the boundary, then it will be set to 93% if it is lower or 125% if it is higher. This modification implies that it follows the current government regulation and avoids the Exploding/Vanishing Gradient problem. Since the changes are capped, it is harder for the sequence to converge to either 0 or infinity. Instead, the model will generate a repeating sequence after generating 100 elements. Since this repeating sequence does not resemble actual market behaviour, I decided to generate only 100 elements, despite avoiding the Exploding/Vanishing Gradient.

For the Low and High, I can simply set the value to 93% and 125% of yesterday’s price, respectively. However, the behaviour of an actual market is not a hard-coded constant either. My solution is to generate a random value between 93% and 125% of yesterday’s price, such that the Low is smaller than the High, while both Open and Close are still in between the value of Low and High. After experimenting with many generations, the randomized Low and High is quite convincing since the range is pre-determined by a reasonable Open and Close value. Moreover, it also reduces the amount of computation for the generation, making it more efficient to generate charts.

#### Pre-processing
First, all stock data should have the same length and the same date. All stocks that do not fulfil this requirement will be removed. These steps resulted in the current dataset that we used, 81 stocks with 1253 days worth of data each.

The next step is data normalization. We use a combination of 2 normalization techniques, which are Log Normalization and Min-Max Normalization. The Log Normalization is inspired by a lot of data visualization in stock prices where the data is served in logarithmic scale, which makes everything clearer to understand. Meanwhile, the Min-Max Normalization will linearly scale the log value of each price to between 0 and 1. This step is needed for the LSTM (or RNN in general) to work. Else, the Exploding/Vanishing Gradient will happen a lot quicker, i.e. after generating 3-4 numbers.

The next and final pre-processing step is to prepare the dataset for the training process. First, combine Open and Close with an alternating pattern. Then, convert the given dataset into sliding window data, where the input is a certain window, and the output is the next window. Finally, the sliding window data from all stocks are combined into 1 large dataset containing almost 200,000 data. Therefore, the model will learn from not just one stock but all 81 stocks. This is allowed since the goal of the model is to mimic the market behaviour, not just a particular stock.

#### My model

The model consists of 3 LSTM cells with 120 neurons each. The model's input is a 60-dimensional vector, which contains 30 days of alternating Open and Close, as explained in the previous section. The model's output is a 60-dimensional vector from a Time-distributed Layer with a ReLU activation function to ensure no negative data. This 60-dimensional vector is the next generated value, which can be either Open or Close, alternatingly.

<a href="https://ibb.co/4mS8XgP"><img src="https://i.ibb.co/tm2qvP8/model.jpg" alt="model" border="0"></a>

The model achieves an R-squared of 99.62% from the validation dataset. We consider this accuracy a success since the model is neither underfitting nor overfitting. The model is capable of producing new sequences that are convincing and quite similar to actual market behaviour. This can be achieved due to a quite large amount of training data, together with the hyper-parameter fine-tuning. Most importantly, my solution of combining Open and Close, which makes everything comes together as a solid and convincing chart. The model is quite efficient and capable of generating an OHLC sequence of length 100 in under 3 seconds using GPU computing. Note that this is a testing environment using Google Colab, while the actual environment in the server does not have GPU computing.

#### Price Noise

The price noise, which ticks every 0.5 seconds, is randomized using Gaussian Distribution. Gaussian Distribution often is used to represent distribution in any natural phenomenon, including prices bid by buyers and offered by sellers of the stock market.

<a href="https://ibb.co/tmH6js4"><img src="https://i.ibb.co/smg4xw2/Distribution-for-Price-Noise-2.png" alt="Distribution-for-Price-Noise-2" border="0"></a>

---

## Resources

#### Developed using:
- Bootstrap 5.0
- Python 3.9.6
- Flask 2.0.1
- Jinja2 3.0.1
- numpy 1.19.5
- pandas 1.3.2
- tensorflow-cpu 2.6.0
- sklearn 0.24.2

Other Resources
- Dataset from <a href="https://github.com/yumoxu/stocknet-dataset/tree/master/price/raw">Stocknet Dataset by Yumoxu</a>
- Layout heavily modified from <a href="https://startbootstrap.com/template/sb-admin">Start Bootstrap SB Admin</a>
- Price Chart from <a href="https://github.com/tradingview/lightweight-charts">Lightweight Charts</a>
- Counter Button modified from <a href="https://bootsnipp.com/snippets/dGWP">Buttons minus and plus in input by davidsantanacosta</a>
- Gaussian Distribution randomizer from <a href="https://newbedev.com/javascript-math-random-normal-distribution-gaussian-bell-curve">JavaScript Math.random Normal distribution (Gaussian bell curve)?</a>

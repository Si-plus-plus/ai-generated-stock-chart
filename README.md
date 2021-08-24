# ai-generated-stock-chart
by import numpy as pd
for AIC - Compfest 13

## Motivational Problem
#### Stock Trading Simulator

Stock Trading has been extablished for a while and people around the world are participating to both support the industry through investment as well as the revenue gain from trading. However, it is intimidating for beginners to start trading. There has been a lot of classes, both online and offline, that teach people to become a better trader. Stock Trading Simulator is a key to learning how to trade, because people tend to be afraid of losing money if they are trading with actual money.

Typically, there are three data that can be used in such simulator: pre-existing data from the past, computer-generated data, and real-time data using virtual currency. Each approach has its own advantages and disadvantages. For instances, using pre-existing data might lead to some bias because the event already happened. Meanwhile using virtual currency on real-time data might produce some kind of regret, such as regretting to not using real money because of high gain in the simulation.

The final option is our approach, which is a computer-generated data. However, if the data is too random, it does not represent actual case. Even if we use some pre-assumption, i.e. assuming normal distribution on the price movement, that does not necessarily replicate the real-life situation. The only way to generate data that are close to the actual data is through using Artificial Intelligence (AI), specifically Machine Learning (ML). ML will learn how the price moves by teaching the ML model with real-life historical data, and our model use that information to generate a brand new data which are trying to replicate the actual data.

AI in trading is commonly known for predicting/forecasting price. We believe that AI and ML can be extended beyond it, and this project is the beginning of a new era for stock trading simulator.

#### Scalability

In the future, we want to extend the features and flexibilities of this website, such as multiple stocks where the stocks might affect each others. Other quality of life updates such as leaderboard and statistics are possible to implemented for future updates. Multiplayer mode with ELO rating is possible as a gamification of this system, making the practice more fun and enjoyable. User might choose the amount of stocks, the amount of historical data, the starting seed, starting cash, and trading duration for flexibilities.
Another extension that can be made to this website is an automatic mentoring system, where an AI, either hard-coded or not, will teach the user on how to make better decision as well as the reasoning on the decision. Therefore, not only user gain experience on their trading, but also expand their knowledge on how to be better trader.

## Dataset

The data is taken from Stocknet Dataset by Yumoxu (https://github.com/yumoxu/stocknet-dataset/tree/master/price/raw), where all data is from International stocks ranging from 4 September 2012 to 1 September 2017. Unfortunately, there is no “93% to 125%” regulation in this dataset. Since the model will learn from the data without the regulation, this hard-cap of 93% to 125% is currently hard-coded.

In total, 81 stock data were used, where each consists of 1253 data. Each data consists of the date of the transaction, as well as the Open, High, Low, Close (OHLC) price of that day. The original data also contains Adjusted Close and Volume, but it is not required for our model. However, only the Open and Close price are being used to train the ML model, meanwhile the Low and High price are generated using normal distribution based on the Open and Close price. Therefore, the ML model can learn the general behaviour of the market, while the actual price, including Low and High, are simulating the random and natural behaviour of a mass of people.

Open price indicates the price at the beginning of the day, and Close price indicates the price at the end of the day. Therefore, it makes more sense if we combine both Open and Close data with alternating order (Open, Close, Open, Close, ...) and generating Open and Close price together. It will introduce the time-series property of Open and Close, rather than generating Open and Close individually.

Since my model use a sliding-window approach with window size of 60 (30 days, alternating Open and Close), each training data consists of 30 days worth of information, which is utilized to generate the price of the following day. In total, there are almost 200,000 sliding-window data that can be used to train the ML model. The data is split 70:30 for training dataset and validation dataset. The validation dataset is used to evaluate how well the generator performs, and it will prevent the model from overfitting.
The ML will generate a brand new OHLC data, which then will be feeded to the front-end of the web for the simulator and shown as a candlestick chart. More detail explanation on our model are provided in the “Our AI Model” section of this website.

## Stock Generator

#### LSTM with Sliding Window

Our approach to the stock generating problem is time-series, where the list of price is considered as a sequence. Time-series problems are famously solved by Deep Recurrent Neural Network (RNN) such as Long-Short Term Memory (LSTM), which is the algorithm used in this model. LSTM is an algorithm proposed by Sepp Hochreiter and Jürgen Schmidhuber as an improvement to regular RNN in a problem called Exploding/Vanishing Gradient. Sequences generated by RNN tend to converge to either 0 or infinity. LSTM is an improvement, but not a solution to this problem. While RNN is capable of generating good sequences for roughly up to 5-6 elements, LSTM can generate roughly up to 100. This is the reason why in this version, user can only see up to 100 days in total for better experiences.

There are better solution to Exploding/Vanishing Gradient problem, such as LSTM with Encoder-Decoder approach, or even better the state-of-the-art Transformer model with Attention Mechanism. However, our concern is the computing time. It took a couple seconds for our server (without GPU-computing) to generate sequence of 100 elements with just LSTM. Using deeper model to generate longer sequences might take a couple minutes to generate a chart. Since this is only a demo version, we stick to a simple LSTM with Sliding-Window 
approach. Using Transformer for this website is still our consideration for the future of this website.

In Sliding-Window approach, a given window is used to generate the next window. Then, the next window can be used to generate the next window again, which makes it has that ‘sliding’ movement. In the current version of this website, the window size is 30, which is the historical data as the seed. Starting from the given seed, the model generates sequence of length 100 before hitting the Exploding/Vanishing Gradient. This sequence is what the candlestick chart shows in the simulator.

#### Generation Algorithm

The goal of the model is to generate OHLC data. All four of OHLC are related to each other, as well as the historical OHLC data, which makes generating a good-looking and convincing OHLC a lot harder. The easier solution to generating OHLC is to generate these 4 values seperately, but the result is unrealistic, such as too random and chaotic, huge gap between Open to Close, some values are lower than the Low and higher than the High, and no correlation or whatsoever between these 4 values.

My solution has solved these problems and the model is capable of producing convincing charts. First, the algorithm will generate the Open and Close together. Since Open is the price in the beginning of a day, and Close is the price at the end of a day, Open and Close should be a time-series data that affects each other. I combine the Open and Close dataset, with the Open and Close alternate each others. For example, the sequence in my dataset will be Open day 1, Close day 1, Open day 2, Close day 2, Open day 3, Close day 3, etc. Then, after the generation is complete, the odd and even index can be seperated. The even index is for Open, and the odd index is for Close (assuming zero-based indexing).
Furthermore, in order to give the restriction of “93% to 125% of the previous day’s price”, we hard-coded such rule to the generation algorithm. If the model decided to generate numbers outside the boundary, then it will be set to 93% if it is lower, or 125% if it is higher. The implication of this modification is that not only it follows the current government regulation, but also it avoided the Exploding/Vanishing Gradient problem. Since the changes are capped, it is harder for the sequence to converge to either 0 or infinity. Instead, the model will generate a repeating sequence after generating 100 elements. Since this repeating sequence does not resemble actual market behaviour, I decided to generate only 100 elements at most, despite avoiding the Exploding/Vanishing Gradient.

For the Low and High, I can simply set the value to 93% and 125% of the yesterday’s price, respectively. However, the behaviour of an actual market is not a hard-coded constant either. My solution is to generate a random value between 93% and 125% of the yesterday’s price, such that the Low is smaller than the High, while both Open and Close still in between the value of Low and High. After experimenting with a lot of generation, the randomized Low and High is quite convincing, since the range is pre-determined by a reasonable Open and Close value as well. Moreover, it also reduces the amount of computation for the generation, making it more efficient to generate charts.

#### Pre-processing
First, all stock data should have the same length and the same date. All stocks that does not fulfill this requirement will be removed. This steps resulting on the current dataset that we used, which is 81 stocks with 1253 days worth of data each.

The next step is data normalization. We use a combination of 2 normalization technique, which are Log Normalization and Min-Max Normalization. The Log Normalization inspired by a lot of data visualization in stock prices where the data is served in logarithmic scale, which makes everything clearer to understand. Meanwhile the Min-Max Normalization will linearly scale the log value of each price to between 0 and 1. This step is needed for the LSTM (or RNN in general) to work. Else, the Exploding/Vanishing Gradient will happen a lot quicker, i.e. after generating 3-4 numbers.

The next and final pre-processing step is to prepare the dataset for the training process. First, combine Open and Close with alternating pattern. Then, convert the given dataset into sliding-window data, where the input is a certain window and the output is the next window. Finally, the sliding-window data from all stocks are combined into 1 large dataset, which contains almost 200,000 data. Therefore, the model will learn from not just one stock, but from all 81 stocks. This is allowed since the goal of the model is to mimick the market behaviour, not just a particular stock.


#### The Model

The model consists of 3 LSTM cells with 120 neurons each. The input of the model is a 60-dimensional vector, which contains 30 days of alternating Open and Close, as explained in the previous section. The output of the model is a 60-dimensional vector from a Time-distributed Layer with ReLU activation function to ensure no negative data. This 60-dimensional vector is the next generated value, which can be either Open or Close, alternatingly.

The model achieve R-squared of 99.62% from the validation dataset. We consider this accuracy a success, since the model is neither underfitting nor overfitting. The model capable of producing new sequences that are convincing and quite similar to actual market behaviour. This can be achieved due to a quite large amount of training data, together with the hyper-parameter fine-tuning. Most importantly, my solution of combining Open and Close, which makes everything comes together as a solid and convincing chart. The model is quite efficient, and capable of generating a OHLC sequence of length 100 in under 3 seconds using GPU-computing. Note that this is a testing environment using Google Colab, while the actual environment in the server does not have GPU-computing.

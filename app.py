import flask
from static.py.nameGenerator import genStockTicker
from static.py.hashName import hashName
from static.model.chartGenerator import generateStockPrice

app = flask.Flask(__name__,
                  static_url_path='/static',
                  static_folder='static',
                  template_folder='templates')

@app.route('/')
def home():
    ticker = genStockTicker();
    generateStockPrice (hashName(ticker))
    return flask.render_template(
        'index.html',
        stockTicker = ticker,
    )

if __name__ == '__main__':
    app.run(port=80)

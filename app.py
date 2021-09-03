from flask import session, Flask, render_template, request
import os
import random
from flask_wtf import FlaskForm
from wtforms.fields.html5 import IntegerRangeField
from wtforms import SubmitField
from static.py.nameGenerator import genStockTicker
from static.model.chartGenerator import generateStockPrice

class Starting_chart(FlaskForm):
    days = IntegerRangeField('Candle', default = 15)
    submit = SubmitField('Generate Chart')

app = Flask(__name__,
            static_url_path='/static',
            static_folder='static',
            template_folder='templates')

app.config['SECRET_KEY'] = 'aicstockchartfin'

@app.route('/', methods = ["GET", "POST"])
def home():
    form = Starting_chart()
    # print (form.validate_on_submit())
    if (form.is_submitted()):
        start = 1
        pre_chart = request.form['days']
        # print ("submitted")

        ticker = genStockTicker()
        generateStockPrice (int(pre_chart),
                            random.randint(0, 1e3))

        return render_template(
            'index.html',
            form = form,
            stock_ticker = ticker,
            start = True,
            starting_days = pre_chart,
            name=session.get('name')
        )
    else:
        return render_template(
            'index.html',
            form = form,
            stock_ticker = '$TICKER',
            start = False,
            starting_days = 0,
            name=session.get('name')
        )

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
    # app.run(port=1223)

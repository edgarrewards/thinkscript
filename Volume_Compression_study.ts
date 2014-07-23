declare lower;

plot Data;
Data.setPaintingStrategy(PaintingStrategy.HISTOGRAM);
Data.setLineWeight(3);
Data.setStyle(Curve.FIRM);
Data.DefineColor("maxCompression", Color.RED);
Data.DefineColor("lessCompression", Color.ORANGE);
Data.DefineColor("Compression", Color.DARK_GREEN);
input Bollinger_subtrahend = 0.1;

def multi = Power(10, 5.0);
def range = if((high-low) != 0, high-low, 0.0001);

def compression = volume(symbol = getSymbol(),priceType = "LAST")/ range / multi;
rec lastcompression = compression[1];
Data = compression;
def bollinger = reference BollingerBandsSMA("price" = compression, "displace" = 0, "length" = 16, "num_dev_dn" = 2, num_dev_up = 2).UpperBand;
Data.AssignValueColor(if compression >= bollinger-Bollinger_subtrahend then Data.Color("maxCompression") else if compression > lastcompression then Data.Color("Compression") else Data.Color("lessCompression"));


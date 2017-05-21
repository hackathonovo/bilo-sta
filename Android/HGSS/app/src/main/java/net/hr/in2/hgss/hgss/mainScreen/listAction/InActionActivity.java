package net.hr.in2.hgss.hgss.mainScreen.listAction;

import android.app.Activity;
import android.os.Bundle;
import android.os.Handler;
import android.support.v7.app.AppCompatActivity;
import android.view.MenuItem;
import android.widget.ImageView;
import android.widget.Toast;

import com.squareup.picasso.Picasso;

import net.hr.in2.hgss.hgss.R;
import net.hr.in2.hgss.hgss.extra.Utils;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class InActionActivity extends AppCompatActivity {

    private Handler mHandler;
    private Activity activity;
    GPSTracker gps;
    double latitude;
    double longitude;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_in_action);

        ImageView imageView = (ImageView) findViewById(R.id.in_progress_image);
        Picasso.with(this).load(R.drawable.hgss_logo).into(imageView);

        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        activity = this;

        mHandler = new Handler();
        startRepeatingTask();
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        stopRepeatingTask();
    }

    Runnable mStatusChecker = new Runnable() {
        @Override
        public void run() {
            try {
                someWork(); //this function can change value of mInterval.
            } finally {
                // 100% guarantee that this always happens, even if
                // your update method throws an exception
                mHandler.postDelayed(mStatusChecker, 1000*4);
            }
        }
    };

    private void someWork() {

        gps = new GPSTracker(activity);

        // check if GPS enabled
        if(gps.canGetLocation()){

            latitude = gps.getLatitude();
            longitude = gps.getLongitude();

            // \n is for new line
            //Toast.makeText(getApplicationContext(), "Your Location is - \nLat: " + latitude + "\nLong: " + longitude, Toast.LENGTH_LONG).show();
        }else{
            // can't get location
            // GPS or Network is not enabled
            // Ask user to enable GPS/network in settings
            gps.showSettingsAlert();
        }

        Call<Boolean> call = Utils.getRestApi().sendLoaction(Utils.getPerson().getUsername(), longitude, latitude);
        call.enqueue(new Callback<Boolean>() {
            @Override
            public void onResponse(Call<Boolean> call, Response<Boolean> response) {
                if (response.body() != null) {

                } else {
                    Toast.makeText(activity, getResources().getString(R.string.error), Toast.LENGTH_LONG).show();
                }
            }
            @Override
            public void onFailure(Call<Boolean> call, Throwable t) {
                Toast.makeText(activity, getResources().getString(R.string.error), Toast.LENGTH_LONG).show();
            }
        });
    }

    void startRepeatingTask() {
        mStatusChecker.run();
    }

    void stopRepeatingTask() {
        mHandler.removeCallbacks(mStatusChecker);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case android.R.id.home:
                //Write your logic here
                this.finish();
                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    }


}

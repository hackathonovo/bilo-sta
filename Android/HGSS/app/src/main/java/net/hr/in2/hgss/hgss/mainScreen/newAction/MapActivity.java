package net.hr.in2.hgss.hgss.mainScreen.newAction;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.FragmentActivity;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.maps.model.MarkerOptions;

import net.hr.in2.hgss.hgss.R;

import butterknife.BindView;
import butterknife.ButterKnife;

import static net.hr.in2.hgss.hgss.R.id.map;

public class MapActivity extends FragmentActivity implements OnMapReadyCallback {

    private GoogleMap mMap;
    private Marker marker;
    private static Activity activity;

    @BindView(R.id.add_meet_location_marker_btn)
    Button meetLovationBtn;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_map);

        ButterKnife.bind(this);
        activity = this;
        // Obtain the SupportMapFragment and get notified when the map is ready to be used.
        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(map);
        mapFragment.getMapAsync(this);
    }

    @Override
    public void onMapReady(GoogleMap googleMap) {
        mMap = googleMap;
        mMap.setMapType(GoogleMap.MAP_TYPE_TERRAIN);

        LatLng cro = new LatLng(45, 16);
        mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(cro, 6));

        mMap.setOnMapClickListener(new GoogleMap.OnMapClickListener() {

            @Override
            public void onMapClick(LatLng point) {

                if (marker == null) {
                    MarkerOptions markerOptions = new MarkerOptions().position(new LatLng(point.latitude, point.longitude)).title("Mjesto susreta");
                    marker = mMap.addMarker(markerOptions);
                } else {
                    marker.remove();
                    MarkerOptions markerOptions = new MarkerOptions().position(new LatLng(point.latitude, point.longitude)).title("Mjesto susreta");
                    marker = mMap.addMarker(markerOptions);
                }
            }
        });

        meetLovationBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(marker != null){
                    LatLng location = marker.getPosition();
                    double[] locationArray = new double[2];
                    locationArray[0] = location.longitude;
                    locationArray[1] = location.latitude;

                    Intent intent = getIntent();
                    Bundle bundle = new Bundle();
                    bundle.putDoubleArray("location", locationArray);
                    intent.putExtras(bundle);
                    setResult(RESULT_OK, intent);
                    finish();
                }else{
                    Toast.makeText(activity, getResources().getString(R.string.needed_marker), Toast.LENGTH_LONG).show();
                }

            }
        });

    }
}

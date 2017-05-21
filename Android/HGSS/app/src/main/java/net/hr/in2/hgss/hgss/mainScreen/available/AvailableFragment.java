package net.hr.in2.hgss.hgss.mainScreen.available;

import android.app.Activity;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.CompoundButton;
import android.widget.Switch;
import android.widget.Toast;

import net.hr.in2.hgss.hgss.R;
import net.hr.in2.hgss.hgss.extra.Utils;
import net.hr.in2.hgss.hgss.mainScreen.MainActivity;

import butterknife.BindView;
import butterknife.ButterKnife;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class AvailableFragment extends Fragment {

    @BindView(R.id.switch_on_off)
    Switch switchOnOff;

    Activity activity = null;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_available, container, false);
        ButterKnife.bind(this, view);

        activity = getActivity();

        ((MainActivity) getActivity()).getSupportActionBar().setTitle("Dostupnost");

        Call<Boolean> call = Utils.getRestApi().getAvailability(Utils.getPerson().getUsername());
        call.enqueue(new Callback<Boolean>() {
            @Override
            public void onResponse(Call<Boolean> call, Response<Boolean> response) {
                if (response.body() != null) {
                    switchOnOff.setChecked(response.body());
                } else {
                    Toast.makeText(activity, getResources().getString(R.string.error), Toast.LENGTH_LONG).show();
                }
            }
            @Override
            public void onFailure(Call<Boolean> call, Throwable t) {
                Toast.makeText(activity, getResources().getString(R.string.error), Toast.LENGTH_LONG).show();
            }
        });

        switchOnOff.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton compoundButton, boolean b) {
                Call<Boolean> call = Utils.getRestApi().setAvailability(Utils.getPerson().getUsername(), b);
                call.enqueue(new Callback<Boolean>() {
                    @Override
                    public void onResponse(Call<Boolean> call, Response<Boolean> response) {

                        if (response.body() != null) {
                            Toast.makeText(activity, getResources().getString(R.string.available_success), Toast.LENGTH_SHORT).show();
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
        });

        return view;
    }
}
